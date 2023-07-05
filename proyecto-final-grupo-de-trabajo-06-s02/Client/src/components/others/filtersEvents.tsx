import React, { useState, useEffect } from "react";
import { DatePicker, Select } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "../../styles/filtersEvents.css";

interface Category {
    categoryId: string;
    name: string;
}

interface FiltersEventsProps {
    onCategoryChange: (selectedCategory: string) => void;
    onDateChange: (selectedDate: string) => void;
}

const FiltersEvents: React.FC<FiltersEventsProps> = ({ onCategoryChange, onDateChange }) => {
    
    const handleChange = (value: string) => {
        setCategory(value);
        onCategoryChange(value);
    };

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setCategory] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const onChange = (date: any, dateString: string) => {
        setSelectedDate(dateString);
        onDateChange(dateString);
      };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            const response = await fetch("http://api.sivtickets.fun/events/categories");
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="filters" id="menu-filter">
            <div className="container-filters">
                <DatePicker
                    clearIcon={true}
                    onChange={onChange}
                    style={{
                        width: "80%",
                        textAlign: "left",
                    }}
                />
                <Select
                    placeholder="Selecciona una categoría"
                    style={{
                        width: "80%",
                        textAlign: "left",
                    }}
                    onChange={handleChange}
                    options={categories.map((ct) => {
                        return {
                            value: ct.categoryId,
                            label: ct.name,
                        };
                    })}
                />
                <UpOutlined
                    style={{ fontSize: "16px", color: "#FFAA00" }}
                    id="close-filters"
                    className="icon-close"
                />
            </div>
        </div>
    );
};

export default FiltersEvents;
