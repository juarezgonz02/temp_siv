import { Button } from 'antd'
import '../../styles/bannerEventsCreated.css'
import { Link } from 'react-router-dom';


const BannerEventsCreated = () => {
  return (
    <div>
        <div className='container-banner-events-created'>
            <label className='banner-event-text-prop'>Eventos creados</label>
            <Link to='./new'>
            <Button className='button-event-created' style={{background: '#FFAA00', color: 'black', border: '1px solid black', width: 'auto'}} type="primary">Crear evento</Button>
            </Link>
        </div>
    </div>
  )
}

export default BannerEventsCreated
