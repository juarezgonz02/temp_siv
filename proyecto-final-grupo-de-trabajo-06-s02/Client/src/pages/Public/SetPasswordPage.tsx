import { Button, Form, Input, message } from 'antd';
import Logo from '../../assets/password-icon.svg';
import '../../styles/setPasswordPage.css';
import { useNavigate, useParams } from 'react-router-dom';

const SetPasswordPage: React.FC = () => {

    const { request_id } = useParams()
    const nav = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sucedio un error. Puede ser que este enlace ya no sea valido o revisa tu contraseña!',
        });
    };

    const load = () => {
        messageApi.open({
            type: 'loading',
            content: 'Espera...',
            duration: 0,
        })
    }

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Se creó tu contraseña, Bienvenido!',
            duration: 2,
            onClose: () => { nav("/") }
        });
    };

    const sendChangePassword = (e) => {
        load()
        changePassword(e)
    }

    const changePassword = async (e) => {
        console.log(e)
        const req = await fetch(`http://api.sivtickets.fun/auth/setPassword/${request_id}`,
            {
                method: "POST",
                headers: {
                  "Content-Type": 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ password: e.password, new_password: e.confirmPassword })
            })

        if (req.ok) {
            messageApi.destroy();
            success();

        } else {
            messageApi.destroy();
            error()
        }



    }

    return (

        <div className='set-password-page set-password-container'>
            {contextHolder}
            <img className='set-password-logo' src={Logo} alt="logo" />
            <h1 className='set-password-title'>Establecer contraseña</h1>
            <Form className='set-password-form' name='set-password' onFinish={sendChangePassword}>
                <Form.Item
                    className='set-password-input'
                    label="Contraseña"
                    name="password"
                    labelCol={{ span: 8 }}
                    rules={[{ min: 8,required: true, message: 'Por favor ingrese su nueva contraseña!' }]}>
                    <Input.Password placeholder='**********' />
                </Form.Item>
                <Form.Item
                    className='set-password-input'
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    labelCol={{ span: 8 }}
                    rules={[{ min: 8, required: true, message: 'Por favor confirme su contraseña!' }]}>
                    <Input.Password placeholder='**********' />
                </Form.Item>
                <Form.Item >
                    <Button className='set-password-button set-password-desktop' htmlType="submit">
                        Guardar Contraseña
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SetPasswordPage;