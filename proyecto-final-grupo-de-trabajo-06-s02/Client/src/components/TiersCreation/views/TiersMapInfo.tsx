import {useContext} from 'react'
import { DataCreationContext } from '../DataCreationContext'
import { Space, Tag } from 'antd';
import PurchaseInstructions from '../../global/purchaseInstructions';
const colors = [
  "magenta", "green", "cyan", "lime", "blue", "geekblue", "purple", "orange", "gold", "orange "
]

const TiersMapInfo = () => {
    const {tierJsonDataState} = useContext(DataCreationContext)
    const {tierJsonData} = tierJsonDataState
    let colorIndex = 0;
    const txt = "Haz click en localidad que deseas comprar para poder escoger entre los asientos disponibles"
    return (
    <div className='TiersInfoContainer'>

    <PurchaseInstructions textDescription={txt} />

    <p className='subtext'>
        Categorias
    </p>
    <div className='tiersTags'>
      <Space size={[8, 16]} wrap>
        {
            
          tierJsonData?.map(({tierId: bloque_asiento_id, requestedName: nombre_solicitado, price: precio})=>{

            return <Tag key={bloque_asiento_id} color={colors[colorIndex++]}>
              {nombre_solicitado} {precio}
            </Tag>
          })
        }
      </Space>
      </div>  

    </div>
  )
}

export default TiersMapInfo
