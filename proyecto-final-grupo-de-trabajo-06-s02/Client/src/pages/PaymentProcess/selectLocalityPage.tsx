/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ButtonsPayment from '../../components/others/buttonsPayment';
import TiersView from '../../components/TiersView'
import DataContext from '../../components/TiersView/DataContext';
import { useParams } from 'react-router-dom'


const SelectLocalityPage = () => {
  
  const { event_id, location_id } = useParams();
  const handleConfirm = "../confirming_purchase" 
  const handleCancel = "/" 
  return (
    
    <div className='info-container'>
      <DataContext>
        <TiersView event_id={event_id!} location_id={location_id!} >
          <ButtonsPayment firstButton='Volver' secondButton='Siguiente' handleConfirmPath={handleConfirm} handleCancelPath={handleCancel}></ButtonsPayment>
        </TiersView>
      </DataContext>
    </div>
  )
}

export default SelectLocalityPage
