import React from 'react'
import Banner from '../../global/banner'
import InfoEventCont from '../../global/infoEventCont'
import { Event, StatisticCont } from '../../../utils/types';
import { useParams } from 'react-router-dom';
import { Tier } from '../../TiersView/DataContext';
import { useState, useEffect } from 'react'
import { AuthContext } from '../../../utils/AuthContext';
import { useContext } from 'react';


const InfoEventValid: React.FC = () => {
    const [event, setEvent] = useState<Event[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [statistic, setStatistic] = useState<StatisticCont[]>([]);
    const [token] = useContext(AuthContext).token

    const { event_code, id} = useParams();
    
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


            const countPath = "tickets/validate/count"
            const response3 = await fetch(`http://${url}/${countPath}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const countData = await response3.json();

            setStatistic(countData);
            setEvent(eventsdata);
            setTiers(tiersData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='container'>
            <Banner text='Información del evento' />
            <InfoEventCont showImg={false} statsCont={true} showFunctions={false} info={event} statis={statistic} tiers={tiers} />
        </div>
    )
}


export default InfoEventValid