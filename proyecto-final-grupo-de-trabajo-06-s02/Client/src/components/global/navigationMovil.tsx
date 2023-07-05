import { Tag } from 'antd'
import '../../styles/navigationMobil.css'
import { UserOutlined, ScheduleOutlined, RiseOutlined, UsergroupDeleteOutlined, SettingOutlined, CloseOutlined, CarryOutOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'

const NavigationMovil = () => {

    const [token] = useContext(AuthContext).token
    const [name] = useContext(AuthContext).name
    return (
        <div className='navigation' id='navigation'>
            <div className='navigation-container' >
            <CloseOutlined className='btn-close' id='close-navigation'/>
            
            {token == undefined && 
                        <Link to="/login">

                        <Tag style={{display: 'flex',width: 'auto',alignItems: 'center', color: '#FFAA00', gap: 10, border: 'none', fontSize: 15}}>
                            <UserOutlined></UserOutlined>
                            Inicio de sesion
                        </Tag>
                        </Link>
            }

            {token != undefined && 
                        <Link to="/account">

                        <Tag style={{display: 'flex',width: 'auto',alignItems: 'center', color: '#FFAA00', gap: 10, border: 'none', fontSize: 15}}>
                            <UserOutlined></UserOutlined>
                            {name}
                        </Tag>
                        </Link>
            }


            <Link to="/eventmod">
            <Tag style={{display: 'flex',width: 'auto', color: '#FFAA00', gap: 10,border: 'none', fontSize: 15}}>
                <ScheduleOutlined />
                Eventos
            </Tag>
            </Link>

            <Link to="/validator">
            <Tag style={{display: 'flex', alignItems: 'center',background:'#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15}}>
                <CarryOutOutlined />
                Validar
            </Tag>
            </Link>
            
            <Link to="/analysis">

            <Tag style={{display: 'flex',width: 'auto',alignItems: 'center', color: '#FFAA00', gap: 10, border: 'none', fontSize: 15}}>
                <RiseOutlined />    
                Graficos
            </Tag>
            </Link>

            <Link to="/moderator/users">

            <Tag style={{display: 'flex',width: 'auto', alignItems: 'center', color: '#FFAA00', gap: 10, border: 'none', fontSize: 15}}>
                <UsergroupDeleteOutlined />
                Gestion de usuarios
            </Tag >
            </Link>
            
            <Link to="/admin">
            <Tag style={{display: 'flex', width: 'auto',alignItems: 'center', color: '#FFAA00', gap: 10,border: 'none', fontSize: 15}}>
                <SettingOutlined />
                Configuracion  
            </Tag>
            </Link>
            </div>
        </div>
    )
}


export default NavigationMovil
