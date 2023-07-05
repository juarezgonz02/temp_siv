import { Divider } from 'antd'
import { Button, Col, Row, Statistic } from 'antd';
import '../../styles/infoEventCont.css'
import { Link } from 'react-router-dom'
import { Tier } from '../TiersView/DataContext'
import { Event, StatisticCont } from '../../utils/types'

const InfoEventCont = ({ info, tiers, statsCont, statis, showFunctions, showImg }: { info: Event[], tiers: Tier[], statis: StatisticCont[] ,statsCont: boolean, showImg: boolean, showFunctions: boolean }) => {

    if (info.length == 0 && tiers.length == 0) {
        return (<></>)
    }

    return (
        <div className='info-container'>
            {showImg && <div className='img-container'>
                <img src={info[0].banner} className='img-event'></img>
            </div>}
            <div className='data-container'>
                <p className='title-event'>{info[0].title}</p>
                <p className='title-label'>Descripcion</p>
                <p className='content-label'>{info[0].description}</p>
                <div className="divider-container">
                    <Divider className='divider'></Divider>
                </div>
                <p className='title-label'>Patrocinadores</p>
                <div className="sponsors-event">
                    <span className='content-label'>Super Selectos</span>
                    <span className='content-label'>Radio FM</span>
                </div>
                <div className="divider-container">
                    <Divider className='divider'></Divider>
                </div>
                <p className='title-label'>Duracion</p>
                <span className='content-label'>{info[0].duration}</span>
                <div className="divider-container">
                    <Divider className='divider'></Divider>
                </div>
            </div>
            <div className='tiers-info-container'>
                <p className='title-label'>Localidades</p>
                {tiers.map((tier) => {
                    return (
                        <div className='tier-container' key={tier.tierId}>
                            <div className='tier'>
                                <label className='name-tier'>{tier.requestedName}</label>
                                <label className='price-tier'>{`$${tier.price}`}</label>
                            </div>
                            <div className="divider-container">
                                <Divider className='divider'></Divider>
                            </div>
                        </ div>

                    )
                })}
                {statsCont && <div className='stats-container'>
                    <label className='title-label'>Estadisticas del evento</label>
                    <Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 26}}>
                        <Col span={10}>
                            <Statistic title="Tickets vendidos" value={statis.ticket_selled} />
                        </Col>
                        <Col span={10}>
                            <Statistic title="Tickets validados" value={statis.ticket_validated} />
                        </Col>
                    </Row>
                    <Link to="../a17ba2fe-3f5e-447f-a34c-3c18b53cf012/validatorQR">
                        <Button size='large'>Validar Tickets</Button>
                    </Link>
                </div>}
            </div>
            {showFunctions && <div className='funtions-container'>
                <p className='title-label'>Funciones</p>
                <div className="box-functions">
                    {info.map((event) => {
                        return (
                            <div key={event.id} className="function">
                                <span className='normal-label'>{event.locationId.address}</span>
                                <span className='normal-label'>{new Date(event.date).toDateString()}</span>
                                <span className='normal-label'>{new Date(event.date).toTimeString()}</span>
                                <Link to={`../${event.eventId}/${event.locationId.location_id}/select_locality`} relative="path">
                                    <Button className='btn-function'>Comprar</Button>
                                </Link>
                            </div>
                        )
                    })
                    }
                </div>
            </div>}
        </div>
    )
}

interface InfoEventContProps {
    statsCont: boolean,
    showImg: boolean,
    showFunctions: boolean,
}


export default InfoEventCont
