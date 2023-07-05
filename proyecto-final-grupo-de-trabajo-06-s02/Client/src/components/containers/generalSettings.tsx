import NavBar from '../global/navBar'
import Banner from '../global/banner'
import '../../styles/generalSettings.css'
import { Switch } from 'antd';
import NavigationMovil from '../global/navigationMovil';

const GeneralSettings = () => {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    return (
        <div className='GeneralSettings-container'>
            <NavBar showTitle={true} showNavigationWeb={true} />
            <div className='navigationMovil'>
                <NavigationMovil></NavigationMovil>
            </div>
            <Banner text={"Configuración general"}></Banner>
            <div className="container-config">
                <label className='title-config'>Configuraciones generales</label>
                <label className='normal-label-config'>Indicaciones: </label>
                <label className='cont-label-config'>Cambie el modo del switch si desea cambiar el estado del sitio a mantenimiento, esto desabilitara los cartelera para todos los usuarios, y no se podra iniciar sesion con ninguna cuenta hasta que se vuelva habilitar el sitio</label>
                <div className='state-event'>
                    <label className='normal-label-config'>Habililitar el mantenimiento:</label>
                    <Switch style={{ background: '#FFAA00' }} defaultChecked onChange={onChange} />
                </div>
            </div>
        </div>
    )
}

export default GeneralSettings
