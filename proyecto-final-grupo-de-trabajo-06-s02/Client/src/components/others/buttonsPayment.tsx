import{ useContext } from 'react'
import '../../styles/buttonsPayment.css'
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { Link, To } from 'react-router-dom';
import { StepContext } from '../../middleware/PaymentMiddleware';

const ButtonsPayment = ({firstButton, secondButton, handleCancelPath, handleConfirmPath}:(ButtonsPaymentProps)) => {

  const [step, changeStep] = useContext(StepContext)

  return (
    <div className='buttons-container'>
          <div className='button-container' onClick={() => { changeStep(step-1) }}>
            <Link to={handleCancelPath} preventScrollReset={false}>
              <ArrowLeftOutlined style={{ color: 'black' }}/>
              <label className='button' >{firstButton}</label>
            </Link>
          </div>
          <div className='button-container'  onClick={() => {changeStep(step+1)}}>
            <Link to={handleConfirmPath} relative='path' preventScrollReset={false}>
              <CheckOutlined style={{ color: 'black' }}/>
              <label className='button'>{secondButton}</label>
            </Link>
          </div>
    </div>
  )
}

interface ButtonsPaymentProps {
  firstButton: string,
  secondButton: string,
  handleConfirmPath: To,
  handleCancelPath: string
}

export default ButtonsPayment
