
import { Form, DatePicker, TimePicker } from 'antd';
import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import Sponsors from '../../others/sponsors'
import TableDateAndTiers, { DataType } from '../../others/tables/tableDateAndTiers'
import './styles/dateAndTiersForm.css'
import { CreationContext } from '../../../utils/CreationContext';
import { Link } from 'react-router-dom';


const DateAndTiersForm: React.FC = () => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [data, updateData] = useState<DataType[]>([]);
    const [actual, changeActual] = useContext(CreationContext).step
    const [dates, updateDates] = useContext(CreationContext).dates
    const [info] = useContext(CreationContext).info

    useEffect(() => {
        changeActual(1)
    }, [])

    const saveData = (e) => {
        console.log(e)

        const date = e.date.$d

        console.log(date.toISOString())

        const fechaFormateada = date.toISOString().split('T')[0];

        const hour = e.hour.$d.toLocaleTimeString()
            console.log(`${fechaFormateada}T${hour}`)
        const newDate = [new Date(`${fechaFormateada}T${hour}`).toISOString()]

        //data.push(newDate)
        updateDates(newDate.concat(dates))

        form.resetFields()
        console.log("Fechas", data)
    }

    const format = 'HH:mm a';

    const format2 = 'HH';

    return (
        <div className='container-form-dateAndTiers'>
            <Form form={form} name="validateOnly" layout='vertical' onFinish={(e) => { saveData(e) }} autoComplete="off" className='form-dateAndTiers'>
                <div className="event-container-inputs">
                    <Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="hour" label="Hora" rules={[{ required: true }]}>
                        <TimePicker format={format} />
                    </Form.Item>
                    <Form.Item name="duration" label="Duracion" rules={[{ required: true }]}>
                        <TimePicker format={format2} />
                    </Form.Item>
                </div>
                <Button className='btn' htmlType="submit">Añadir funcion</Button>
                <div className='table-container-tiers'>
                    <TableDateAndTiers ></TableDateAndTiers>
                </div>
            </Form>
            <Form form={form2} name="validateOnly"  onFinish={(e) => { saveData(e) }} autoComplete="off" className='form-dateAndTiers'>
                <div className='event-container-tiers'>
                    <Form.Item name="tiers" label="Definir tiers" rules={[{ required: true }]}>
                        <Button className='btn' >
                            <Link to={"../tiers"}>
                                Definir Tiers
                            </Link>
                            </Button>
                    </Form.Item>
                    <Form.Item name="sponsors" label="Definir sponsors" rules={[{ required: true }]}>
                        <Sponsors></Sponsors>
                    </Form.Item>
                </div>
                <div className='btn-dateAndTiers'>
                    <Link to="../informationForEvent">
                        <Button className='btn' onClick={(e) => { changeActual(actual - 1) }}>Volver</Button>
                    </Link>
                    <Link to="../promotorsAndValidators">
                        <Button className='btn' onClick={(e) => { changeActual(actual + 1) }} htmlType="submit">Confirmar</Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default DateAndTiersForm;

/*
import { Form, DatePicker, TimePicker } from 'antd';
import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import Sponsors from '../../others/sponsors'
import TableDateAndTiers, { DataType } from '../../others/tables/tableDateAndTiers'
import { CreationContext } from '../../../utils/CreationContext';
import { Link } from 'react-router-dom';
import './styles/dateAndTiersForm.css'



const DateAndTiersForm: React.FC = () => {
    


    return (
        <div className='container-form'>
        <Form form={form} name="validateOnly" autoComplete="off" className='form'>
            <div className="event-container-inputs">

                <div className='table-container-tiers'>
                </div>
            </div>
            </Form>


            <Form form={form} name="validateOnly"  autoComplete="off" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: 10 }}>

                <Button className='btn' >Definir Tiers</Button>

                <Form.Item name="sponsors" label="Definir sponsors" rules={[{ required: false }]}>
                    <Sponsors></Sponsors>
                </Form.Item>
           </Form>


        </div>
    );
};

export default DateAndTiersForm;*/
