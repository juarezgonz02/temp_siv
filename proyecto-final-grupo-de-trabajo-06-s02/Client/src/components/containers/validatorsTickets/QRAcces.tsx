import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import './styles/QRAcces.css';

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props: any) => {
  let config: any = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: any) => {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;
    if (!(props.qrCodeSuccessCallback)) {
      throw new Error("qrCodeSuccessCallback is a required callback.");
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch((error: Error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div className='prueba' id={qrcodeRegionId} />
  );
};

export default Html5QrcodePlugin;

