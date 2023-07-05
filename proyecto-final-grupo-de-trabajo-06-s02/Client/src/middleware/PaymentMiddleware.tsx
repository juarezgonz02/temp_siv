/* eslint-disable @typescript-eslint/no-empty-function */
import { Outlet, useNavigate } from 'react-router-dom'
import { AlertOutlined } from '@ant-design/icons';
import Banner from '../components/global/banner'
import SelectionSteps from '../components/global/SelectionSteps'
import React, { useState } from 'react'
import { StepProps, StepsProps, message, notification } from 'antd'

export const StepContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])

const PaymentMiddleware = () => {

    const stepstate = useState(0)
    const nav = useNavigate()
    const [step] = stepstate
    const [time, setTime] = useState(2299)
    //const [time, setTime] = useState(15)

    const [api, contextHolder] = message.useMessage();

    const openNotification = () => {
      api.error({
        content: 'Se acabo el tiempo, Vuelve a seleccionar un horario y localidad ',
        className: 'custom-class',
        style: {
          marginTop: "40vh",
        },
        duration: 3,
        onClose: () => { nav("/event") },
      });
    };
    
    //const timer = setTimeout(() => { setTime(time-1) }, 1000)

    if(time == 0){
      clearTimeout(timer);
      openNotification()
    }

    const sec = () => {
       if(time<10) {
         return `0${(time%60).toString()}` 
        }
        return time%60
      }
    
    const items:StepProps[] = [
      {
          title: 'Seleccion de asientos',
      },
      {
          title: 'Carrito',
      },
      {
          title: 'Pago',
      },
      {
          title: 'Completado',
      },
  ]

  return (
    <div className='container'>
        {contextHolder}
        <Banner text={`Compra tus asientos`}></Banner>
        <Banner text={`Tiempo restante: ${parseInt((time/60).toString())}:${sec()}`}></Banner>
        <SelectionSteps items={items} step={step}/>
        <StepContext.Provider value={stepstate}>
            <Outlet />
        </StepContext.Provider>
    </div>
  )
}

export default PaymentMiddleware