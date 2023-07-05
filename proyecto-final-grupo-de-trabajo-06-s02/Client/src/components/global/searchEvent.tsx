import { Input } from 'antd';
import React from "react"
import MenuFilter from '../others/menuFilter'

const { Search } = Input;

const SearchEvent: React.FC = () => {
    return (
            <div className='container-search'>
                <Search placeholder="Search Event" style={{ width:'80%', height: 32, marginLeft: 10}} />
                <MenuFilter></MenuFilter>
            </div>
    )
}

export default SearchEvent
