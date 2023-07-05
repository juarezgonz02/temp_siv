import React from "react"
import './styles/confirmingPurchase.css'
import '../../../styles/confirmingPurchase.css'
import PurchaseInfo from '../../global/purchaseInstructions'
import TableProcessingPayment from '../../others/tables/tableProcessingPayment'
import ButtonsPayment from '../../others/buttonsPayment'


const ConfirmingPayment: React.FC  = () => {

    const handleConfirm = "../payment"
    const handleCancel = ".."

  return (
      <div className='info-container'>
        <PurchaseInfo textDescription={'A continuacion se te presenta el resumen de tu seleccion de asientos si deseas remover alguno lo puedes hacer seleccionando el boleto y  presionando el boten de remover o directamente con el check de verificacion'}></PurchaseInfo>
        <label className='title-table'>Resumen de compra</label>
        <div className='table-container'>
          <TableProcessingPayment></TableProcessingPayment>
        </div>
        <ButtonsPayment firstButton='Volver' secondButton='Siguiente' handleConfirmPath={handleConfirm} handleCancelPath={handleCancel}></ButtonsPayment>
      </div>
    )
}

export default ConfirmingPayment
