/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, useParams } from 'react-router-dom'
import Creation, { CreationContext } from '../utils/CreationContext'
import SelectionSteps from '../components/global/SelectionSteps'
import { StepProps } from 'antd'
import Banner from '../components/global/banner'
import NavBar from '../components/global/navBar'
import { useContext, useEffect } from 'react'
import EventContextProvider from '../utils/EventsContext'
import { Event } from '../utils/types'
import BannerEventsCreated from '../components/others/bannerEventsCreated'
import NavigationMovil from '../components/global/navigationMovil'
import { AuthContext } from '../utils/AuthContext'

const stepsItems: StepProps[] = [
  {
    title: 'Información del evento',
  },
  {
    title: 'Fechas y localidades',
  },
  {
    title: 'Promotores y validadores',
  },
  {
    title: 'Guardar',
  },
]

export const EditView = () => {
  const { event_code } = useParams()
  const [actual] = useContext(CreationContext).step
  const [, setInfo] = useContext(CreationContext).info
  const [, setDates] = useContext(CreationContext).dates
  const [, setEmployee] = useContext(CreationContext).employes
  const [, setImgUrl] = useContext(CreationContext).img

  const [token] = useContext(AuthContext).token

  useEffect(() => {

    const mostrarAlerta = () => {

      // Personalizar el mensaje de alerta
      const mensaje = '¿Seguro que quieres abandonar esta página?';

      // Algunos navegadores requieren que el mensaje se asigne a la propiedad returnValue del evento
      return mensaje;
    }

    window.addEventListener("beforeunload", mostrarAlerta);
  })

  useEffect(() => {

    (async () => {


      const host = "api.sivtickets.fun"
      const route = "events";
      
      const headersData = new Headers()
      
      headersData.append('Authorization', 'Bearer '+token)

      const data: Event[] = await (await fetch(`http://${host}/${route}/${event_code}`)).json()

      //const employees: any[] = await (await fetch(`http://api.sivtickets.fun/events/creation/employees/${event_code}`)).json()
      const employees = []
      console.log(data)

      setInfo({
        title: data[0].title,
        description: data[0].description,
        category: data[0].category.categoryId,
        manager: "",
        state: data[0].state == "SELLING",
        duration: data[0].duration
      })

      setImgUrl(data[0].banner)

      setDates(data.map((event) => { return event.date }))

      setEmployee(employees)
    })()

  }, [])


  return (
    <div>
      <Banner text={stepsItems[0].title!.toString()}></Banner>
      <SelectionSteps step={actual} items={stepsItems} />
    </div>
  )
}

const CreationMiddleware = () => {

  const { event_code } = useParams()

  return (
    <Creation>
      <EventContextProvider>

        <NavBar showNavigationWeb={true} showTitle={true}></NavBar>
        <div className='navigationMovil'>
          <NavigationMovil></NavigationMovil>
        </div>
        {
          event_code && <EditView />
        }
        {
          !event_code &&
          <BannerEventsCreated />

        }
        <Outlet />
      </EventContextProvider>
    </Creation>
  )
}

export default CreationMiddleware