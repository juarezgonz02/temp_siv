/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext } from 'react'
import Events from '../../components/containers/events'
import { EventContext } from '../../utils/EventsContext'

const actions = [
  {
    text: "Informacion",
    color: "geekblue",
    navigation: "",
    state: ()=>{},
  }
]

const EventsPage = () => {
  
  const [, changeSelected] = useContext(EventContext).selectedEvent
  
  localStorage.removeItem("selEvent")
  changeSelected(undefined)
  
  return (
    <div>
      <Events url="http://api.sivtickets.fun/events/billboard" actions={actions}></Events>
    </div>
  )
}

export default EventsPage
