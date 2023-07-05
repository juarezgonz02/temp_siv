import LogoPNG from '../../assets/Logo_N-Capas_2.png'
import React, { useContext } from "react"
import '../../styles/navigationNavBar.css'
import { Link } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'
import { NavigationContext } from '../../context/NavigationContext'

const NavigationNavBar: React.FC<NavBarProps> = ({ showTitle }) => {
    const { width } = useWindowSize();
    const {setShowSidebar} = useContext(NavigationContext);
    
    const toggleMenu = () => {
        setShowSidebar(show => !show);
    };

    return (
        <div className='navigation-nav-bar'>
            <Link to="/event">
                <div className='navigation-nav-bar-logo'>
                    <img className='logo-navigation-nav-bar' src={LogoPNG} alt="logo" />
                    {showTitle && <label className='navigation-nav-bar-label'>SivTickets</label>}
                </div>
            </Link>
            <div className='navigation-nav-bar-menu' onClick={width < 600 ? toggleMenu : undefined}>
                <svg className="navigation-nav-bar-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
            </div>
        </div>
    )
}

interface NavBarProps {
    showTitle: boolean;
}

export default NavigationNavBar;