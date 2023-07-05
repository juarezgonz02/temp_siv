import './styles/processingPayment.css'
import PaymentForm from '../../global/forms/paymentForm'
import ButtonsPayment from '../../../components/others/buttonsPayment'

const ProcessingPayment = () => {

    const handleConfirm = '../success';
    const handleCancel = "../confirming_purchase";

    return (
        <div className='container'>
            <div className='payment-container'>
                <PaymentForm></PaymentForm>
            </div>
            <ButtonsPayment firstButton='Volver' secondButton='Pagar' handleConfirmPath={handleConfirm} handleCancelPath={handleCancel}></ButtonsPayment>
        </div>
    )
}

export default ProcessingPayment
