import { Form, Input, Select, Button } from 'antd';
import UserManagementTable from '../../others/tables/userManagementTable';
const { Search } = Input;
import './styles/userManagementForm.css'


const UserManagementForm = () => {
    return (
        <div className="userManagment-container-form">
            <Form className="userManagment-form">
                <div className="search-inputs">
                    <Form.Item label="Correo">
                        <Search placeholder="Correo"></Search>
                    </Form.Item>
                    <Form.Item label="permisos">
                        <Select>
                            <Select.Option value="managamente">Managamente</Select.Option>
                            <Select.Option value="promotor">Promotor</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="userManagment-table">
                    <UserManagementTable></UserManagementTable>
                </div>
                <div className='btn-userManagement'>
                    <Button className='btn'>Volver</Button>
                    <Button className='btn' htmlType="submit">Guardar</Button>
                </div>
            </Form>
        </div>
    )
}

export default UserManagementForm
