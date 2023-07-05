import { Link, useNavigate } from 'react-router-dom';
import { MenuOption } from '../../interfaces/MenuCategory';
import '../../styles/menuEntry.css'


interface Props {
    option: MenuOption;
    logo?: string;
}

const MenuEntry = ({ option, logo }: Props) => {


    return (

        <Link to={option.path}>
            <span className='sidebar-menuentry-options'>    
                {!!logo && <img className='sidebar-logout-vector' src={logo} alt="logout" />}
                {option.title}
            </span>
        </Link>
    
    )

};

export default MenuEntry;