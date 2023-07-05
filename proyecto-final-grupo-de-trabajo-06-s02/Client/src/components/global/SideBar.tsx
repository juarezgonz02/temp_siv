import { useContext, useEffect, useState } from 'react';
import '../../styles/sideBar.css';
import { MenuCategory } from '../../interfaces/MenuCategory';
import { CUSTOMER_MENU_CATEGORIES, LOGOUT_OPTION } from '../../interfaces/Menu';
import MenuEntry from './MenuEntry';
import Logout from '../../assets/logout-vector.svg'
import { AuthContext } from '../../utils/AuthContext';
import { NavigationContext } from '../../context/NavigationContext';
import { useWindowSize } from 'usehooks-ts';

const SideBar = () => {
    const fetchCategories = async () => {
        setCategories(CUSTOMER_MENU_CATEGORIES);
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    const clearInfo = useContext(AuthContext).clear
    
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const logout = () => {
        localStorage.clear()
        clearInfo();
    }
    const { showSidebar, setShowSidebar } = useContext(NavigationContext);
    const { width } = useWindowSize();

    useEffect(() => {
        if (width > 550 && showSidebar) {
            setShowSidebar(false);
        }
    }, [width]);

    return (
        <div className={`sidebar-container ${showSidebar ? "sidebar-available" : ""}`}>
            {categories.map((category) => {
                return (
                    <>
                        <p className='sidebar-category-title'>{category.title}</p>
                        {category.options.map((option) => {
                            return <MenuEntry option={option} />
                        })}
                    </>
                )
            })}

            <div className='sidebar-logout' onClick={logout}>
                <hr className='sidebar-divider' />
                <MenuEntry option={LOGOUT_OPTION} logo={Logout} />
            </div>
        </div>
    )
};


export default SideBar;