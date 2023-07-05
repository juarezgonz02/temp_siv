import React, { useContext, useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import {
  LoadingOutlined,
} from '@ant-design/icons';

interface StorageSeats {
  price: number
  selected: string[]
  tier_id: string
  tier_name: string
}

const SucessPaymentPage: React.FC = () => {
  
  const { event_id } = useParams();

  const [created, setCreated] = useState(false)
  
  const [token] = useContext(AuthContext).token

  useEffect(() => {

    (async () => {
      const actual: StorageSeats[] = JSON.parse(sessionStorage.getItem("seatSelected")!).seats

      const purcharseInfo = {
        event_id: "",
        seats: {

        },
        total: 0
      }

      actual.forEach((seats: StorageSeats) => {
        purcharseInfo.event_id = event_id!

        purcharseInfo.seats[seats.tier_id] = seats.selected

        purcharseInfo.total += seats.price * seats.selected.length
      })

      console.log(purcharseInfo)
      
     const req = await fetch("http://api.sivtickets.fun/account/purchases/new", {
       method: "POST",
       body: JSON.stringify(purcharseInfo),
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer " + token
       }
     })

     if (req.status == 201) {
       setCreated(true);
     }

    })()

  }, [])
  useEffect(() => {
    if (!created) {
      return
    }


  }, [created])

  return (
    <>
      {
        created &&
        <Result
          status="success"
          title="Se ha completado tu pago! "
          subTitle="Order number: 2017182818828182881 Revisa tu correo con los tickets."
          extra={[
            <Link to="/">
              <Button type="primary" key="console">
                Home
              </Button>
            </Link>
          ]}
        />
      }

      {
        !created &&
        <Result
          icon={<LoadingOutlined />}
          status="info"
          title="Se está procesando tu compra! "
          subTitle="Espera un momento."

        />
      }
    </>
  )
};

export default SucessPaymentPage;