/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/login.css'
import Logo from '../../assets/Logo_N-Capas.png'
import { Button, Form, Input, message, notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import { useWindowSize } from 'usehooks-ts';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';

interface AuthResDTO {
    messages: {
        img: string,
        email: string,
        name: string,
        token: string,
        type: string,
        authorized: string[]
    }
}

const LoginPage: React.FC = () => {
    const { width } = useWindowSize()

    const [logged, setlogged] = useState(false)
    const [accountType, setType] = useState("")

    const [, setEmail] = useContext(AuthContext).email
    const [, setName] = useContext(AuthContext).name
    const [, setPermissions] = useContext(AuthContext).permission
    const [token, setToken] = useContext(AuthContext).token

    const nav = useNavigate()
    const [api, notificationContextHolder] = notification.useNotification();
    const [messageApi, messageContextHolder] = message.useMessage();



    const openVerifyMessageNotification = () => {
        api.open({
            message: 'Revisa tu correo',
            description:
                "Se ha enviado un mensaje de verificación",
            icon: <InfoCircleOutlined style={{ color: "yellow" }} />,
        });
    };

    const openCredentialsMessageNotification = () => {
        api.warning({
            message: 'No se encontró tu cuenta',
            description:
               "Revisa tu correo o contraseña",
            icon: <InfoCircleOutlined style={{ color: "yellow" }} />,
        });
    };

    const openVerifyErrorNotification = () => {
        api.open({
            message: 'Debes verificar tu correo',
            description:
                "Verifica tu correo a traves del enlace enviado a bandeja",
            icon: <InfoCircleOutlined style={{ color: "red" }} />,
        });
    };
    const openInvalidErrorNotification = () => {
        api.open({
            message: 'Error: Intente de nuevo más tarde',
            description:
                "Vuelve a intentar el inicio de sesion o regresa luego",
            icon: <InfoCircleOutlined style={{ color: "red" }} />,
        });
    };

    const openWaitingLogin = () => {
        messageApi.open({
            type: 'loading',
            content: 'Iniciando Sesion..',
            duration: 0,
        });
    };

    useEffect(() => {
        if (token != undefined) {

            setType("REGISTERED");
            setlogged(true);
        }
    }, [])

    useEffect(() => {

        if (!logged) {
            return
        }

        messageApi.destroy()

        console.log("TYPE", accountType)

        if (accountType == "REGISTERED") {
            nav("/")
        }

        if (accountType == "CREATE") {
            setlogged(false)
            openVerifyMessageNotification()
        }

        if (accountType == "INVALID") {
            openInvalidErrorNotification()
            setlogged(false)
        }

        if (accountType == "UNVERIFIED") {
            openVerifyErrorNotification()
            setlogged(false)

        }

        if (accountType == "CREDENTIALS") {
            openCredentialsMessageNotification()
            setlogged(false)

        }





    }, [logged])

    const signedIn = (res: any) => {

        openWaitingLogin();
        sendOauthToken(res)

    }

    const sendOauthToken = async (res: any) => {

        // create XMLHttpRequest object
        const xhr = new XMLHttpRequest()
        // open a POST request
        xhr.open("POST", "http://api.sivtickets.fun/auth/oauth2")
        // set content-type header to JSON
        xhr.setRequestHeader("Authorization", "Bearer " + res.credential);

        
        xhr.onload = () => { reqListener(xhr) }
        xhr.onerror = clearAndShowError

        xhr.send()


    }
    
    const clearAndShowError = () => {
        messageApi.destroy()
        openInvalidErrorNotification()
    }

    const reqListener = (xhr: XMLHttpRequest) => {

        try {

            const { messages }: AuthResDTO = JSON.parse(xhr.responseText)

            console.log(messages)


            if (xhr.status == 500) {
                setType("INVALID");
                setlogged(true);
            }

            if (xhr.status == 401) {
                setType("CREDENTIALS");
                setlogged(true);
            }

            setType(messages.type);

            if (messages.type != "REGISTERED") {
                setlogged(true);
                return
            }

            setEmail(messages.email)
            setName(messages.name)
            setPermissions(messages.authorized)
            setToken(messages.token)
            setlogged(true);

        }
        catch (error) {
            openInvalidErrorNotification();
        }
    }
 
    const regularLogin = ({email, password}:({email: string, password: string})) => {
        // create XMLHttpRequest object
        const xhr = new XMLHttpRequest()
        // open a POST request
        xhr.open("POST", "http://api.sivtickets.fun/auth/login")
        // set content-type header to JSON
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        const body = {
            credentials: email,
            password: password,
        }


        xhr.onload = () => { reqListener(xhr) }
        xhr.onerror = clearAndShowError

        xhr.send(JSON.stringify(body))
    }

    const failedSignIn = () => {
        console.log("Failed Log")
    }


    return (

        <div className='login-page login-container'>
            {messageContextHolder}
            {notificationContextHolder}
            <Link to="/">
                <img className='login-logo' src={Logo} alt="logo" />
            </Link>
            <h1 className='login-title'>{width >= 550 ? "Ingresa tu cuenta" : "Ingresar"}</h1>
            <Form className='login-form' name='login' style={{ maxWidth: 600 }} onFinish={(e) => { regularLogin(e) }}>
                <Form.Item
                    className='login-input'
                    label="Email"
                    name="email"
                    labelCol={{ span: 5 }}
                    rules={[{ required: true, message: 'Por favor ingrese su usuario!' }]}>
                    <Input placeholder='ejemplo@gmail.com' />
                </Form.Item>
                <Form.Item
                    className='login-input'
                    label="Contraseña"
                    name="password"
                    labelCol={{ span: 5 }}
                    rules={[{min: 8, required: true, message: 'Por favor ingrese su contraseña!' }]}>
                    <Input.Password placeholder='**********' />
                </Form.Item>
                <Form.Item >
                    <Button className='login-button login-desktop' htmlType="submit">
                        Ingresar
                    </Button>
                </Form.Item>
                <div className='login-gmailbutton'>
                    <GoogleLogin
                        onSuccess={signedIn}
                        size="large"
                        theme="filled_black"
                        text="continue_with"
                        onError={failedSignIn}
                    />
                </div>
            </Form>

        </div>
    )
}

export default LoginPage;