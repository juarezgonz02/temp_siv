import { useState } from 'react';
import { Button } from 'antd';
import React from 'react';
import Banner from '../../global/banner';
import '../../../styles/validatorQR.css';
import Html5QrcodePlugin from './QRAcces';
import { useContext } from 'react';
import { AuthContext } from '../../../utils/AuthContext';
import { useParams } from 'react-router-dom';
import { StatisticCont } from '../../../utils/types';

const ValidatorQR: React.FC = () => {
  const [showQRAccess, setShowQRAcces] = useState(false);
  const [token] = useContext(AuthContext).token;
  const [statistic, setStatistic] = useState<StatisticCont[]>([]);
  const [stopScanning, setStopScanning] = useState(false); // Variable de estado para detener el escaneo

  const { id } = useParams();

  const validateTicket = async (decodedText: string, decodedResult: any) => {
    try {
      const url = "api.sivtickets.fun";
      const path = "tickets/validate";
      const response = await fetch(`http://${url}/${path}/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({ decodedText }) 
      });

      if (response.ok) {
        console.log("Ticket validado");
        setStopScanning(true); // Se detiene el escaneo cuando se valida el ticket
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMostrarComponente = () => {
    setShowQRAcces(true);
  };

  const onNewScanResult = (decodedText: string, decodedResult: any) => {
    if (!stopScanning) {
      validateTicket(decodedText, decodedResult);
    }
  };

  return (
    <div className='validatorQR-container'>
      <Banner text={"Validador de QR"}></Banner>
      <div className="instructions">
        <label className='label-title'>Instrucciones:</label>
        <label className='label-content'>Presione el boton para poder comenzar a validar lo tickets del evento</label>
      </div>
      <div className="qr">
        <Button className='btn-qr' onClick={handleMostrarComponente}>Iniciar lectura de QR</Button>
        {showQRAccess && (
          <div className="App">
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidatorQR;

