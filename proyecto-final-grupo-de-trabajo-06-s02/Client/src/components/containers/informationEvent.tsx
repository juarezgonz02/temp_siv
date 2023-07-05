import React from 'react'
import {useState, useEffect} from 'react'
import Banner from '../global/banner'
import InfoEventCont from '../global/infoEventCont'
import { Event } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { Tier } from '../TiersView/DataContext';
import NavigationMovil from '../global/navigationMovil';


const InformationEvent: React.FC = () => {
    const [event, setEvent] = useState<Event[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([]);

    const {event_code} = useParams();
    
    useEffect(() => {
      getAllEventsInfoByCode()
    }, []);


    const getAllEventsInfoByCode = async () => {
      try {
        const url = "api.sivtickets.fun";
        const path = "events"
        const response = await fetch(`http://${url}/${path}/${event_code}`);
        const eventsdata = await response.json();

        const tiersPath = "events/tiers"
        const response2 = await fetch(`http://${url}/${tiersPath}/${event_code}`);
        const tiersData = await response2.json();
        
        setEvent(eventsdata);
        setTiers(tiersData);
        
        console.log(eventsdata);
      } catch (error) {
        console.error('Error:', error);
      }
    }; 
    

  return (
    <div className='container'>
        <Banner text= "Informacion del evento"/>
        <div className='navigationMovil'>
          <NavigationMovil></NavigationMovil>
      </div>
        <InfoEventCont showImg={true} statsCont={false} showFunctions={true} info={event} tiers={tiers}/>
    </div>
  )
}



export default InformationEvent
