import { useEffect } from 'react';
import reactLogo from "./assets/logo.svg";
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';
import './App.css';

function App() {
  useEffect(() => {
    const config = {
      license: "YOUR-LICENSE-KEY", 
      container: ".barcode-scanner-view ",
      engineResourcePaths: {
        rootDirectory: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
      scannerViewConfig: {
        cameraEnhancerUIPath: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
    }
    const barcodeScanner = new BarcodeScanner(config);
    barcodeScanner.launch().then((result)=>{
      console.log(result);
    });
  })
  return (
    <div className="barcode-scanner-hello-world-page">
      <div className="barcode-scanner-title">
        <h2 className="barcode-scanner-title-text">Hello World for React</h2>
        <img className="barcode-scanner-title-logo" src={reactLogo} alt="logo"></img>
      </div>
      <div className="barcode-scanner-view "></div>
    </div>
  )
}

export default App;
