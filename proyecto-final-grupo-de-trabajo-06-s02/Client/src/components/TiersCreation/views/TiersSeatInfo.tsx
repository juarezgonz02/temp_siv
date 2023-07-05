import { useContext } from 'react'
import { DataCreationContext } from '../DataCreationContext'
import { Divider, Space, Tag } from 'antd';
import PurchaseInstructions from '../../global/purchaseInstructions';
const colors = [
  "#3CB371", "#f50", "grey", "lime", "blue", "geekblue", "purple", "orange", "gold", "orange "
]

const tags = ["Disponible", "Vendido", "Seleccionado"]

const TiersSeatInfo = () => {
  const { tierJsonDataState } = useContext(DataCreationContext)
  let colorIndex = 0;

  const txt = "Haz click en localidad que deseas comprar para poder escoger entre los asientos disponibles"
  return (
    <div className='TiersInfoContainer'>

      <PurchaseInstructions textDescription={txt} />

      <div className='tiersTags'>
        <Space size={[8, 10]} wrap>
          {

            tags.map((txt) => {

              return <Tag key={txt} color={colors[colorIndex++]}>
                {txt}
              </Tag>
            })
          }
        </Space>
      </div>

    </div>
  )
}

export default TiersSeatInfo
