import { Tag } from 'antd';
import { Link } from "react-router-dom";
import { action } from "../containers/events";
import { useContext } from 'react';
import { EventContext } from '../../utils/EventsContext';
import { Event } from '../../utils/types';

const ValidatedCard = ({id,title, banner, category, data, date, actions, code}: (EventCardData)) => {

    const {selectedEvent} = useContext(EventContext)
    const [,changeSelected] = selectedEvent;    

    return (
        <div className='event-card'>
            <img src={banner} className={'img-class'} alt="imagen" />
            <div className={'date-category'}>
                <label className={'label-date'}>{date}</label>
                <Tag>{category}</Tag>
            </div>
            <h3 className={'title'}>{title}</h3>
            <div className={'tags'} onClick={() => { changeSelected(data) }}>
                {actions.map(({text, color, navigation}) => { 
                    return (
                    <Link key={navigation} to={`${code}${navigation}/${id}`}>
                        <Tag color={color}> {text} </Tag>
                    </Link>
                    )
                    })
                }
            </div>
        </div>
    );
}

type EventCardData = {
    id: string,
    date: string,
    banner: string,
    category: string,
    actions: action[],
    data: Event,
    title: string,
    code: string
}

export default ValidatedCard;