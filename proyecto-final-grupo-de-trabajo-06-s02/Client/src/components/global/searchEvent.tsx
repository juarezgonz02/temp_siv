import { Input } from 'antd';
import React from "react"
import MenuFilter from '../others/menuFilter'

const { Search } = Input;

interface SearchEventProps {
  onSearch: (title: string) => void;
}

const SearchEvent: React.FC<SearchEventProps> = ({ onSearch }) => {
  
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className='container-search'>
      <Search placeholder="Search Event" style={{ width:'80%', height: 32, marginLeft: 10}} onSearch={handleSearch} />
      <MenuFilter></MenuFilter>
    </div>
  );
}

export default SearchEvent;
