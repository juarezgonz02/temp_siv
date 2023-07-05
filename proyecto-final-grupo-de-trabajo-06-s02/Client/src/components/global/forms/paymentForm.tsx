import { Form, Input, DatePicker, Space } from 'antd';
import './styles/paymentForm.css'
import Visa from '../../../assets/visa-credit-card.png'
import MasterCard from '../../../assets/mastercard.png'
import { Save } from '../../TiersView/utils/saveSeats';

const PaymentForm = () => {
    const [form] = Form.useForm();
    const checkSessionStorage = () => {

        const actual:Save = JSON.parse(sessionStorage.getItem("seatSelected") || "")
        
        let total = 0;
        
        actual.seats.forEach((seat) => {
            total += seat.price * seat.selected.length
        })

        return total
    }
    return (
        <div>
            <div className='img-cards'>
                <img src={Visa} alt="visa" className='img-card'></img>
                <img src={MasterCard} alt="mastercard" className='img-card'></img>
            </div>
            <div className='container-form'>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                <Form.Item name="name" label="Nombre completo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="card-number" label="Numero de tarjeta" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="verificacion-code" label="Numero de tarjeta" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="verificacion-code" label="Numero de tarjeta" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date-picker" label="DatePicker" rules={[{ required: true }]}>
                    <div className="dates-picker">
                        <Space direction="horizontal" size={12} >
                            <DatePicker picker='month' />
                            <DatePicker picker='year' />
                        </Space>
                    </div>
                </Form.Item>
            </Form>
            </div>
            <div className='total-payment'>
                <label className='total-payment-label'>Total a pagar:</label>
                <label className='total-payment-label'>{"$"+checkSessionStorage()}</label>
            </div>
        </div>

    );
};

export default PaymentForm;