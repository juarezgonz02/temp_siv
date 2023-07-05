import { Tag } from 'antd'
import '../../styles/navigationWeb.css'
import { UserOutlined, ScheduleOutlined, RiseOutlined, UsergroupDeleteOutlined, SettingOutlined, CarryOutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'

const NavigationWeb = () => {
    const [username] = useContext(AuthContext).name
    const [permissions] = useContext(AuthContext).permission

    return (
        <div className='navigationWeb-container' >

            {
                (username == undefined) &&
                <Link to="/login">
                    <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                        <UserOutlined></UserOutlined>
                        Inicio de sesion
                    </Tag>
                </Link>
            }
            {
                (username != undefined) &&
                <Link to="/account">
                    <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                        <UserOutlined></UserOutlined>
                        {username}
                    </Tag>
                </Link>
            }

            {
                permissions.map((permission) => {
                    switch (permission) {
                        case "ADMIN":
                            return (
                                <Link to="/admin">
                                    <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                                        <SettingOutlined />
                                        Configuracion
                                    </Tag>
                                </Link>
                            )
                        case "EVENTMOD":

                            return (
                                <Link to="/eventmod">
                                    <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                                        <ScheduleOutlined />
                                        Promotor
                                    </Tag>
                                </Link>)
                            break;
                        case "USERMOD":
                            return (
                                <Link to="/moderator/users">

                                <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                                    <UsergroupDeleteOutlined />
                                    Gestion de usuarios
                                </Tag >
                            </Link>
                            )
                            break;
                        case "VALIDATION":
                            return (
                            <Link to="/validator">
                                <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                                    <CarryOutOutlined />
                                    Validar
                                </Tag>
                            </Link>
                
                            )
                            break;
                        case "DATA":
                            return (
                            <Link to="/analysis">

                                <Tag style={{ display: 'flex', alignItems: 'center', background: '#1F2D3D', color: '#FFAA00', gap: 5, border: 'none', fontSize: 15 }}>
                                    <RiseOutlined />
                                    Graficos
                                </Tag>
                            </Link>
                            )
                            break;

                        default:
                            break;
                    }
                })
            }
        </div>
    )
}

export default NavigationWeb
