import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Bullet from "../../assets/record-button.png";
import CustomerForm from "../../components/global/CustomerForm";
import CustomerTitle from "../../components/global/CustomerTitle";
import SideBar from "../../components/global/SideBar";
import TransactionInfo from "../../components/global/TransactionInfo";
import { DEFAULT_USER, MOCK_USER, User } from "../../interfaces/User";
import '../../styles/general.css';
import NavigationNavBar from "../../components/global/NavigationNavBar";
import useMyAccount from "../../hooks/useMyAccount";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";


const MyAccount = () => {
    const [user, setUser] = useState<User>(DEFAULT_USER);
    const {getUserInfo, changeUserPassword} = useMyAccount();

    function getFirstName(): string {
        const names = user.name.split(' ');
        const wordsAmount = names.length;
        
        if (wordsAmount === 1 || wordsAmount === 2) {
          return names[0];
        } else if (wordsAmount === 3) {
          return `${names[0]} ${names[1]}`; 
        } else if (wordsAmount >= 4) {
          return names.slice(0, -2).join(' ');
        } else {
          return '';
        }
      }
      
      function getLastName(): string {
        const names = user.name.split(' ');
        const wordsAmount = names.length;
      
        if (wordsAmount === 2) {
          return names[1];
        } else if (wordsAmount === 3) {
          return names[2];
        } else if (wordsAmount >= 4) {
          return names.slice(-2).join(' '); 
        } else {
          return '';
        }
      }

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const user = await getUserInfo();
        setUser(user);
    };

    const changePassword = async ({password, newPassword, confirmPassword}: any) => {
        if (newPassword !== confirmPassword) {
            toast.error('La nueva contraseña no coincide!');
            return;
        }

        const passwordWasChanged = await changeUserPassword(password, newPassword);
        
        if (passwordWasChanged) {
            toast.success("Tu contraseña ha sido actualizada con éxito");
        } else {
            toast.error("La contraseña actual es incorrecta");
        }
    }


    return (
        <div className='container customer-container'>
            <Toaster/>
            <NavigationNavBar showTitle />
            <div className="customer-wrapper-container">
                <SideBar />
                <div className="customer-wrapper-content">
                    <CustomerTitle title="Mi cuenta" />
                    <CustomerForm title="Información Personal">
                        <div className="customer-personal-info">
                            <TransactionInfo title="Nombre" content={getFirstName()} />
                            <TransactionInfo title="Apellido" content={getLastName()} />
                            <TransactionInfo title="Correo electrónico" content={user.email} />
                        </div>
                    </CustomerForm>
                    <CustomerForm title="Permisos">
                        <div className="customer-permissions-container">
                            {!!user.access && user.access.map(permission =>
                                <div>
                                    <img src={Bullet} />
                                    <p>{permission}</p>
                                </div>
                            )}
                        </div>
                    </CustomerForm>
                    <CustomerForm title="Cambiar contraseña" last>
                        <Form className='login-form customer-password-change' name='change-password' onFinish={changePassword}>
                            <Form.Item
                                className='login-input customer-input'
                                label={<label className="label-input customer-input" style={{ color: '#0B3954' }}>Contraseña Actual</label>}
                                name="password"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                                <Input.Password placeholder='**********' />
                            </Form.Item>
                            <Form.Item
                                className='login-input customer-input'
                                label={<label className="label-input customer-input" style={{ color: '#0B3954' }}>Nueva Contraseña</label>}
                                name="newPassword"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                                <Input.Password placeholder='**********' />
                            </Form.Item>
                            <Form.Item
                                className='login-input customer-input'
                                label={<label className="label-input customer-input" style={{ color: '#0B3954' }}>Confirmar Contraseña</label>}
                                name="confirmPassword"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                                <Input.Password placeholder='**********' />
                            </Form.Item>
                            <Form.Item >
                                <Button className='login-button login-desktop customer-account-button' htmlType="submit">
                                    Cambiar contraseña
                                </Button>
                            </Form.Item>
                        </Form>
                    </CustomerForm>
                </div>
            </div>
        </div>
    )
};

export default MyAccount;