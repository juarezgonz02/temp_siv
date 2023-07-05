import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd'
import EmailTable from '../../others/tables/promotersTable'
import { Link } from 'react-router-dom';
import {CreationContext} from '../../../utils/CreationContext';
import './styles/promotersAndValidatorForm.css'
import ValidatorsTable from '../../others/tables/validatorsTable';

const PromotersAndValidatorForm: React.FC = () => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [actual, changeActual] = useContext(CreationContext).step
    const [employees, changeEmployees] = useContext(CreationContext).employes

    const promotersData = employees.filter((employe) => { return employe.promotor })
    .map((employe) => { 
        const employee = 
            {
                key: Math.random()*100,
                email: employe.email,
            } 
            return employee 
        
    })

    const verificatorData = employees.filter((employe) => { return employe.validator }).map((employe) => { 
        const employee = 
            {
                key: Math.random()*100,
                email: employe.email,
            } 
            return employee 
        
    })

    const addEmployee = (validador = false, promotor = false, email: string) => {
        const newEmployee = [{
            email: email ,
            validator: validador,
            promotor: promotor
        }]

        changeEmployees(newEmployee.concat(employees))
        
    }

    return (
        <div className='container-form-promotersAndValidators'>
            <Form form={form} name="validateOnly" onFinish={(e) => {addEmployee(true, true, e.promoter) }} autoComplete="off" className='form-promotersAndValidators'>
                <Form.Item name="promoter" label="Promotores" rules={[{ required: true }]}>
                    <Input type='email' />
                </Form.Item>
                <Button className='btn' htmlType='submit' >Agregar promotor</Button>
                <div className='table-promoters'>
                    <EmailTable label="Promotores" data={promotersData}></EmailTable>
                </div>

            </Form>
            
            <Form form={form2} name="validateOnly" onFinish={(e) => {addEmployee(true, false, e.validator) }} autoComplete="off" className='form-promotersAndValidators'>
                
                <Form.Item name="validator" label="Validadores" rules={[{ required: true }]}>
                    <Input type='email' />
                </Form.Item>

                <Button className='btn' htmlType='submit'>Agregar validador</Button>

                <div className='table-validadors'>
                <EmailTable label="Validadores" data={verificatorData}></EmailTable>
                </div>
            </Form>

            <div className='btn-promotersAndValidators'>
                    <Link to="../dateAndTiers">
                        <Button className='btn' onClick={() => { changeActual(actual - 1) }}>Volver</Button>
                    </Link>
                    <Link to="../save">
                        <Button className='btn'>Guardar</Button>
                    </Link>
                </div>
        </div>
    )
}

export default PromotersAndValidatorForm
