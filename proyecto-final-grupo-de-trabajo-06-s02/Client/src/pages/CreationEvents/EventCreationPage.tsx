import { useContext, useEffect } from "react"
import Events from "../../components/containers/events"
import { EventContext } from "../../utils/EventsContext"
import { AuthContext } from "../../utils/AuthContext"
import { Event } from "../../utils/types"
import NavigationMovil from "../../components/global/navigationMovil"
import SearchEvent from "../../components/global/searchEvent"
import FiltersEvents from "../../components/others/filtersEvents"
import CardEvent from "../../components/global/eventCard"
import "../../styles/promoter.css"
export type action = {

    text: string
    color: string, 
    navigation: string
  } 

const DisabledFilter = () => {
    return (
        <div className="disabledFilter">

        </div>
    )
}

const EventCreationPage = () => {
    const actions = [
        {
            text: "Editar",
            color: "blue",
            navigation: "/edit",
            state: () => { },
        },

        {
            text: "Activa/Desactivar",
            color: "red",
            navigation: "/edit/switch",
            state: () => {},
        },
    ]

    const [, changeSelected] = useContext(EventContext).selectedEvent

    changeSelected(undefined)


    const {listEvents} = useContext(EventContext)
  
    const [token] = useContext(AuthContext).token
  
    const [events, setEvents] = listEvents;
  
    useEffect(() => {
      getAllEvents()
       
    }, []);
  
  
    const getAllEvents = async () => {
      try {
  
        const url = "http://api.sivtickets.fun/events/creation/editable/"
        //const response = await fetch(`http://${host}/events/billboard`);
        const response = await fetch(url, {
          headers: {
            'Authorization': 'Bearer '+token
          }
        })
  
        const data:Event[] = await response.json();
  
        const filterEventsByCode = new Set<string>
  
        setEvents(data.filter((event) => { 
          if(filterEventsByCode.has(event.code)){
              return false;
          }
  
          filterEventsByCode.add(event.code)
          return true
         }));
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    return (
      <div className='container'>
        <div className='navigationMovil'>
          <NavigationMovil></NavigationMovil>
        </div>
        <div className="container-filters">
        <SearchEvent />
        <FiltersEvents />
        </div>
        <div className='cards-container'>
          {events.map((event, index) => (
              
            <div className={event.state == "DISABLED" ? "disabledFilter" : ""}> 
            <CardEvent 
              key={index}
              id={event.id}
              title={event.title}
              banner={event.banner}
              date={event.date}
              category={event.category.name}
              data = {event}
              actions={actions}
              code={event.code}
              
              />
            </div>
          ))}
        </div>
      </div>
    )
}

export default EventCreationPage


