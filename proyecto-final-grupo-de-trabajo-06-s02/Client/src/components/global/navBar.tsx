import LogoPNG from '../../assets/Logo_N-Capas_2.png'
import React from "react"
import '../../styles/navBar.css'
import { Link } from 'react-router-dom'
import NavigationWeb from './navigationWeb'

const NavBar: React.FC<NavBarProps> = ({ showTitle, showNavigationWeb }) => {

    const changeDisplay = () => {
        const navigationCont = document.getElementById('navigation')
        const closeNavigation = document.getElementById('close-navigation')
        if (navigationCont?.style.display === 'none') {
            navigationCont.style.display = 'block'
        } else {
            navigationCont?.style.setProperty('display', 'none')
        }
        if (closeNavigation) {
            closeNavigation.addEventListener('click', () => {
                if (navigationCont) {
                    navigationCont.style.display = 'none'
                }
            })
        }
    }

    return (
        <div className='nav-bar'>
            <Link to="/event">
                <div className='nav-bar-logo'>
                    <img className='logo-nav-bar' src={LogoPNG} alt="logo" />
                    {showTitle && <label className='nav-bar-label'>SivTickets</label>}
                </div>
            </Link>
            <div className='menu' onClick={()=> changeDisplay()}>
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                </svg>
            </div>
            {showNavigationWeb && <div className='content-navigate'>
                <NavigationWeb></NavigationWeb>
            </div>}
        </div>
    )
}

interface NavBarProps {
    showTitle: boolean;
    showNavigationWeb?: boolean;
}

export default NavBar





