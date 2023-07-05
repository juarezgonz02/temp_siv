import React from "react";
import { DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "../../styles/filtersEvents.css";

const filtersEvents: React.FC = () => {
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="filters" id="menu-filter">
            <div className="container-filters">
                <DatePicker
                    onChange={onChange}
                    style={{
                        width: "80%",
                        textAlign: "left",
                    }}
                    
                />
                <Select
                    defaultValue="categoria"
                    style={{
                        width: "80%",
                        textAlign: "left",
                    }}
                    onChange={handleChange}
                    options={[
                        { value: "baile", label: "Baile" },
                        { value: "concierto", label: "Concierto" },
                        { value: "orquesta", label: "Orquesta" },
                    ]}
                />
                <Select
                    defaultValue="Localidad"
                    style={{
                        width: "80%",
                        textAlign: "left",
                    }}
                    onChange={handleChange}
                    options={[
                        { value: "cifco", label: "Cifco" },
                        { value: "palacio nacional", label: "Palacio Nacional" },
                        { value: "estadio cuscatlan", label: "Estadio Cuscatlan" },
                    ]}
                />
                <UpOutlined style={{ fontSize: '16px', color: '#FFAA00' }} id="close-filters" className="icon-close"/>
            </div>
        </div>
    );
};



export default filtersEvents;
