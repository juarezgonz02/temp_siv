import { Outlet, useParams } from "react-router-dom"
import Context, { EventContext } from "../utils/EventsContext"
import { ReactNode, useContext } from "react"
import { Event } from "../utils/types"
import DataContext from "../components/TiersView/DataContext"
import NavBar from "../components/global/navBar"
import NavigationMovil from "../components/global/navigationMovil"


const Middleware = ({ children }: (props)) => {

  const { event_code } = useParams();

  const [selected, changeEvent] = useContext(EventContext).selectedEvent

  if (selected == undefined) {
    const empty: Event = {
      id: 0,
      event_id: "",
      event_date: "",
      code: event_code!,
      event_tickets_quantity: 0,
      promoter: "",
      duration: 0,
      location_id: "",
      category: "",
      status: "",
      description: "",
      banner: "",
      title: "",
      total_attendees: 0
    }
    changeEvent(empty)
  }

  return <>{children}</>
}

const EventMiddleware = () => {

  return (
    <DataContext >
      <Context>
        <Middleware>
          <NavBar showNavigationWeb={true} showTitle={true}></NavBar>
          <div className='navigationMovil'>
            <NavigationMovil></NavigationMovil>
          </div>
          <Outlet />
        </Middleware>
      </Context>
    </DataContext>
  )
}

type props = {
  children: ReactNode
}

export default EventMiddleware