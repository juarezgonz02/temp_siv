import { Button, Result } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { CreationContext } from '../../../utils/CreationContext'
import { Link, useParams } from 'react-router-dom'
import {
  LoadingOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../../utils/AuthContext';

const SaveEvent = () => {
  const [,setStep] = useContext(CreationContext).step
  const [loaded, setLoad] = useState(false)
  const [saved, setSaved] = useState(false)
  const [token] = useContext(AuthContext).token
  const [imgUrl] = useContext(CreationContext).img
  const [listOfTiers] = useContext(CreationContext).listOfTiers
  const [location_id] = useContext(CreationContext).location
  const [info] = useContext(CreationContext).info
  const [dates] = useContext(CreationContext).dates
  const [employees] = useContext(CreationContext).employes 

  const {event_code} = useParams()

  setStep(3)
  
  const saveImg = async () => {

    const req = await fetch(`http://api.sivtickets.fun:80/events/creation/img/update/${event_code}?url=${imgUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }})

    if(req.ok){
      setSaved(true)
      setLoad(true)
    }else{
      setSaved(false)
      setLoad(true)
    }
  }

  const saveTiers = async () => {

    try {

      const plainObject = {};
      for (const [key, value] of listOfTiers) {
        plainObject[key] = value;
      }

      const req = await fetch(`http://api.sivtickets.fun:80/events/creation/location/setTiers/${location_id}/${event_code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({

          blockID: plainObject
        }
        )
      })

      if(req.ok){
        saveImg(true)
      }else{
        setSaved(false)
        setLoad(true)
      }

    } catch (e) {
      setSaved(false)
      setLoad(true)
    }
  }

  useEffect(() => {
    (async () => {
      
      const event = {
        info: info,
        dates: dates,
        employees: employees
      }

      const host = "api.sivtickets.fun:80"

      const req = await fetch(`http://${host}/events/creation/save/${event_code}`,{
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+token
        },
        
        body: JSON.stringify(event)
      })

      if(req.ok){
        saveTiers()
      }else{
        setLoad(true)
        setSaved(false)
      }

    })()

  }, [])


  return (
    <>
      {
        !loaded &&
        <Result
          icon={<LoadingOutlined />}
          title="Guardando ..."
          extra={<LoadingOutlined />}
        />
      }
      {
        loaded && saved &&
        <Result
          status="success"
          title="Se ha guardado"
          subTitle="El evento se ha creado correctamente, selecciona activar para poner los tickets a la venta"
          extra={[
            <Link to="/eventmod">
              <Button type="primary" key="console">
                Ver todos los eventos
              </Button>
            </Link>,
            <Link to="../promotorsAndValidators">
              <Button key="buy">Back</Button>,
            </Link>
          ]} />
      }
      {
        loaded && !saved &&
        <Result
        status="error"
        title="No se pudo guardar"
        subTitle="Revisa todos los campos."
        extra={[
          <Link to="../promotorsAndValidators">
            <Button type="primary" key="console">
              Regresar
            </Button>
          </Link>
        ]}
        />
      }
    </>
  )

}

export default SaveEvent
  /*
{

}

*/