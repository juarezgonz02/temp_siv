import { ReactNode, useContext, useEffect } from 'react'
import './snap.css';
import MapView from "./views/MapView"
import { DataContext, Tier } from './DataContext'
import SeatSelector from './views/SeatSelector'
import TiersMapInfo from "./views/TiersMapInfo"
import TiersSeatInfo from "./views/TiersSeatInfo"
import NumberSelector from './views/NumberSelector';

function TiersView({event_id, location_id, children}:({event_id: string, location_id: string, children:ReactNode})) {

  const { tierIdState, canvasSizeState, tierJsonDataState, mapUrlState, availabilityDataState} = useContext(DataContext)
  const { tierID } = tierIdState
  const { setCanvasSize } = canvasSizeState
  const { tierJsonData } = tierJsonDataState
  const { setMapUrl } = mapUrlState
  const { setAvailabilityData } = availabilityDataState
  
  useEffect(() => {

    sessionStorage.setItem("seatSelected", JSON.stringify({seats:[]}))    

    setMapUrl("map_"+location_id);

    if (window.screen.width <= 1024) {
      setCanvasSize({ canvas_h: window.screen.height * 0.50, canvas_w: window.screen.width - 36 })
    } else {
      setCanvasSize({ canvas_h: window.screen.height * 0.50, canvas_w: window.screen.width * 0.65 })
    }

    (async() => { 

      const hostname = window.location.host
      const ticketsSoldInfoPath = "all_sold_tickets_get_event_dummy_data.json"

      //TODO MODIFICAR ESTO PARA QUE FUNCIONE CON DIFERENTES EVENTOS
      fetch(`http://${hostname}/${ticketsSoldInfoPath}?event_id=${event_id}`).then((res) => { 
          return res.json()
       }).then((res) => { 
          setAvailabilityData(res)
        })
      
     })()
  }, [])

  const tier:Tier = tierJsonData?.find(({ name }) => name == tierID)

  return (
    <div className="tiersView">

      {
        (tierID === "" || !tier.numbered) &&
        <TiersMapInfo />
      }

      {
        (tierID !== "" && tier.numbered) &&
        <TiersSeatInfo />
      }
      
      <div className='mapViewContainer'>
        {
          (tierID === "" || !tier.numbered ) &&
          <MapView event_id={event_id} /> 
        }

        {
          //TODO: CAMBIAR ESTO PARA QUE SE DESPLIEGUE ESE COMPONENTE EN UNA NOTFICACIÓN
          (tierID !== "" && !tier.numbered ) &&
         <NumberSelector id={tier.tierId} price={tier.price} />
        }

        {
          tierID !== "" && tier.numbered &&
          <SeatSelector tierID={tier.tierId} />
        }
      </div>
        {
          (tierID === "" || !tier.numbered ) &&
          children
        }
    </div>
  );
}

export default TiersView;
