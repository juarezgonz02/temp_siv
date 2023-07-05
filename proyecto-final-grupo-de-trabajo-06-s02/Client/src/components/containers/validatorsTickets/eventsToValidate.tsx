import { useContext, useEffect } from 'react'
import FiltersEvents from '../../others/filtersEvents'
import { EventContext } from '../../../utils/EventsContext'
import { Event } from '../../../utils/types'
import NavigationMovil from '../../global/navigationMovil'
import { AuthContext } from '../../../utils/AuthContext'
import SearchEvent from '../../global/searchEvent'
import '../../../styles/events.css'
import ValidatedCard from '../../global/validatedCard'
import { useState } from 'react'



export type action = {
    text: string
    color: string,
    navigation: string
}


const EventsToValidate = ({ actions }: ({ actions: action[] })) => {
    const { listEvents } = useContext(EventContext)
    const [events, setEvents] = listEvents;
    const [token] = useContext(AuthContext).token
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

    useEffect(() => {
        getAllEvents()
    }, []);

    console.log(token)
    const getAllEvents = async () => {
        try {
            const response = await fetch('http://api.sivtickets.fun/tickets/events', {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`
            }});
            const data: Event[] = await response.json();
            console.log(data)
            setEvents(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filterEventsByTitle = (title: string) => {
      const filtered = events.filter((event) => event.title.includes(title))
      setFilteredEvents(filtered)
    }
  
    const handleCategoryChange = (selectedCategory: string) => {
      const filtered = events.filter((event) => event.category.categoryId.includes(selectedCategory))
      setFilteredEvents(filtered)
    };
    
    const handleDateChange = (selectedDate: string) => {
      const filtered = events.filter((event) => event.date.includes(selectedDate))
      setFilteredEvents(filtered)
    };
  
      return (
        <div className='container'>
          <div className='navigationMovil'>
            <NavigationMovil></NavigationMovil>
          </div>
          <div className="container-filters">
          <SearchEvent onSearch={filterEventsByTitle} />
          <FiltersEvents onCategoryChange={handleCategoryChange} onDateChange={handleDateChange}/>
          </div>
          <div className='cards-container'>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <ValidatedCard
                  key={index}
                  id={event.eventId}
                  title={event.title}
                  banner={event.banner}
                  date={event.date}
                  category={event.category.name}
                  data={event}
                  actions={actions}
                  code={event.code}
                />
              ))
            ) : (
              events.map((event, index) => (
                <ValidatedCard
                  key={index}
                  id={event.eventId}
                  title={event.title}
                  banner={event.banner}
                  date={event.date}
                  category={event.category.name}
                  data={event}
                  actions={actions}
                  code={event.code}
                />
              ))
            )}
          </div>
        </div>
      )
    }



export default EventsToValidate