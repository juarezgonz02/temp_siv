import React, { useContext } from 'react'
import ConfirmingPurchase from '../../components/containers/purchasingProcess/confirmingPurchase'
import Empty from 'antd/es/empty'
import '../../styles/buttonsPayment.css'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { StepContext } from '../../middleware/PaymentMiddleware'

const NoSeats = () => {
  const [step,changeStep] = useContext(StepContext)

  return <div className='noSeats-container'>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
      <span>
        No has seleccionado ningun asiento
      </span>
    } />

    <div className='button-container' onClick={() => { changeStep(step-1) }}>
      <Link to={".."} preventScrollReset={false}>
        <ArrowLeftOutlined style={{ color: 'black' }} />
        <label className='button' >{"Volver"}</label>
      </Link>
    </div>
  </div>
}

const confirPurcharsePage: React.FC = () => {

  const checkSessionStorage = () => {

    const actual = JSON.parse(sessionStorage.getItem("seatSelected")!)
    console.log(actual)

    return (actual.seats.length != 0)
  }

  return (
    <div>
      {
        checkSessionStorage() &&
        <ConfirmingPurchase></ConfirmingPurchase>
      }
      {
        !checkSessionStorage() &&
        <NoSeats />
      }
    </div>
  )
}

export default confirPurcharsePage
