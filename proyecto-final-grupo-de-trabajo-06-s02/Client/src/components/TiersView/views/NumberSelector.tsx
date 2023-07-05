import InputNumber from 'antd/es/input-number';
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import {saveSeats} from "../utils/saveSeats"
import { Button } from 'antd';


const NumberSelector = ({id, price}:{id: string, price: number}) => {
    
    
    const {tierID, setTierID} = useContext(DataContext).tierIdState

    const onChange = (value: any) => {

        const selectedSeats:string[] = []

        for(let i = 0; i<value; i++){
            selectedSeats.push(`Boleto no numerado`)
        }

        saveSeats(id, tierID, price, selectedSeats )

    };

    return (
        <>
        <div className='shadowCont'> </div>

        <div className='notification'> 
            <div className='nonumeredselector'>
                <span>
                    {"Selecciona la cantidad de boletos:"}
                </span>
                <p>
                    {tierID}
                </p>
                <InputNumber min={1} max={20} defaultValue={0} size='large' controls={true} onChange={onChange} />
                <Button onClick={() => { setTierID("") }}> Atras</Button>
            </div>
        </div>
        
        </>
    )
}

export default NumberSelector