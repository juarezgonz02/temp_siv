/* eslint-disable @typescript-eslint/no-empty-function */
import EventsToValidate from '../../components/containers/validatorsTickets/eventsToValidate'
import { EventContext } from '../../utils/EventsContext'
import { useContext } from 'react'


const actions = [
    {
        text: "Validar tickets",
        color: "green",
        navigation: "/validatorQR",
    },
    {
        text: "Información",
        color: "geekblue",
        navigation: "/infoEventContent",
        state: ()=>{},
    }
]
const EventsToValidatePage = () => {

    const [, changeSelected] = useContext(EventContext).selectedEvent
    localStorage.removeItem("selEvent")

    changeSelected(undefined)

    return (
        <div>
            <EventsToValidate actions={actions}></EventsToValidate>
        </div>
    )
}

export default EventsToValidatePage
