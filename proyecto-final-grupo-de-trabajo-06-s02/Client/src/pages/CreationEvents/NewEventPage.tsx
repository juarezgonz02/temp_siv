import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import notification from 'antd/es/notification'
import message from 'antd/es/message'
import { InfoCircleOutlined } from '@ant-design/icons';

const NewEventPage = () => {

    const [code, setCode] = useState("")
    const [accountType, setType] = useState("")

    const nav = useNavigate()
    const [api, notificationContextHolder] = notification.useNotification();
    const [messageApi, messageContextHolder] = message.useMessage();

    const [token, setToken] = useContext(AuthContext).token

    const openWaitingLogin = () => {
        messageApi.open({
            type: 'loading',
            content: 'Creando el evento...',
            duration: 0,
        });
    };

    const openSuccesCreation = () => {
        messageApi.open({
            type: 'success',
            content: 'Se ha creado, te redirigeremos en 3 segundos ',
            duration: 3,
            onClose: () => { 
                nav("/eventmod/"+code+"/edit")
             }
        });
    };

    useEffect(() => {
        console.log(token)
        if (token != undefined) {

            startRequest()
        }else{
            nav("/")
        }

    }, [])

    useEffect(() => {

        if (code=="") {
            return
        }

        messageApi.destroy()

        console.log("TYPE", accountType)

        if (accountType == "CREATED") {
            openSuccesCreation()
        }

        if (accountType == "INVALID") {
            console.log("Algo salio mal")
            
        }


    }, [code])

    const startRequest = () => {

        openWaitingLogin();
        sendCreationRequest()

    }
    
    const clearAndShowError = () => {
        messageApi.destroy()
        console.log("Algo salio mal")
    }

    const reqListener = (xhr: XMLHttpRequest) => {

        try {

            const { code, type } = JSON.parse(xhr.responseText)

            console.log(code)


            if (xhr.status == 500) {
                setType("INVALID");
            }

            if (xhr.status == 401) {
                setType("INVALID");
            }

            setType(type);
            setCode(code);

            /**
             * 
            if (type != "REGISTERED") {
                setlogged(true);
                return
            }
            
            setEmail(messages.email)
            setName(messages.name)
            setPermissions(messages.permissions)
            setToken(messages.token)
            setlogged(true);
            */

        }
        catch (error) {
            console.log(error);
        }
    }
    const sendCreationRequest = async () => {

        
        // create XMLHttpRequest object
        const xhr = new XMLHttpRequest()
        // open a POST request
        xhr.open("POST", "http://api.sivtickets.fun/events/creation/new")
        // set content-type header to JSON
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        
        xhr.onload = () => { reqListener(xhr) }

        xhr.onerror = clearAndShowError

        xhr.send()
    }
    
    const failedSignIn = () => {
        console.log("Failed Log")
    }


  return (
    <>
        {messageContextHolder}
    </>
  )
}

export default NewEventPage