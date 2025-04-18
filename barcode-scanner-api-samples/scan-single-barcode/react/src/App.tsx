import { useEffect } from 'react';
import reactLogo from "./assets/logo.svg";
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';
import './App.css';

function App() {
  useEffect(() => {
    const config = {
      license: "YOUR-LICENSE-KEY", 
      container: ".dbs-container",
      engineResourcePaths: {
        rootDirectory: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
      scannerViewConfig: {
        cameraEnhancerUIPath: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
    }
    const dbs = new BarcodeScanner(config);
    dbs.launch().then((result)=>{
      console.log(result);
    });
  })
  return (
    <div className="dbs-hello-world-page">
      <div className="dbs-title">
        <h2 className="dbs-title-text">Hello World for React</h2>
        <img className="dbs-title-logo" src={reactLogo} alt="logo"></img>
      </div>
      <div className="dbs-container"></div>
    </div>
  )
}

export default App;
