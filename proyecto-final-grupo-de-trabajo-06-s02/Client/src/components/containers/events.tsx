import SearchEvent from '../global/searchEvent'
import CardEvent from '../global/eventCard'
import FiltersEvents from '../others/filtersEvents'
import { useContext, useEffect, useState } from "react"
import { EventContext } from '../../utils/EventsContext'
import '../../styles/events.css'
import { Event } from '../../utils/types'
import NavigationMovil from '../global/navigationMovil'
import { AuthContext } from '../../utils/AuthContext'

export type action = {
  text: string
  color: string
  navigation: string
}

const Events = ({ url, actions }: { url: string, actions: action[] }) => {
  const { listEvents } = useContext(EventContext)
  const [token] = useContext(AuthContext).token
  const [events, setEvents] = listEvents
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  


  useEffect(() => {
    getAllEvents()
  }, [])

  const getAllEvents = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data: Event[] = await response.json()

      const filterEventsByCode = new Set<string>()
      setEvents(data.filter((event) => {
        if (filterEventsByCode.has(event.code)) {
          return false
        }

        filterEventsByCode.add(event.code)
        return true
      }))

    } catch (error) {
      console.error('Error:', error)
    }
  }

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
            <CardEvent
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
        )
         : (
          events.map((event, index) => (
            <CardEvent
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

export default Events

