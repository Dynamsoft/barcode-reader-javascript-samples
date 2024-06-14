import React from "react";
import "../../dynamsoft.config";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

const strErrorDistoryed = 'videoCapture component destoryed';

class VideoCapture extends React.Component {

  uiContainer: React.RefObject<HTMLDivElement> = React.createRef();
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();
  
  resolveInit?: ()=>void;
  pInit:Promise<void> = new Promise(r=>{this.resolveInit=r});
  bDestoryed = false;
  
  cvRouter?:CaptureVisionRouter;
  cameraEnhancer?:CameraEnhancer;

  async componentDidMount() {

    try{
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      if(this.bDestoryed){ throw Error(strErrorDistoryed); } // Check if component is destroyed after every async
      this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if(this.bDestoryed){ throw Error(strErrorDistoryed); }
  
      // Get default UI and append it to DOM.
      this.uiContainer.current!.append(cameraView.getUIElement());
  
      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      this.cvRouter = await CaptureVisionRouter.createInstance();
      if(this.bDestoryed){ throw Error(strErrorDistoryed); }
      this.cvRouter.setInput(this.cameraEnhancer);
  
      // Define a callback for results.
      this.cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;
  
        this.resultsContainer.current!.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          this.resultsContainer.current!.append(
            `${item.formatString}: ${item.text}`,
            document.createElement('br'),
            document.createElement('hr'),
          );
        }
      }});
  
      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification("barcode", true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication("barcode", true);
      await this.cvRouter.addResultFilter(filter);
      if(this.bDestoryed){ throw Error(strErrorDistoryed); }
  
      // Open camera and start scanning single barcode.
      await this.cameraEnhancer.open();
      if(this.bDestoryed){ throw Error(strErrorDistoryed); }
      await this.cvRouter.startCapturing("ReadSingleBarcode");
      if(this.bDestoryed){ throw Error(strErrorDistoryed); }
  
    }catch(ex:any){
      
      if((ex as Error)?.message === strErrorDistoryed){
        console.log(strErrorDistoryed);
      }else{
        let errMsg = ex.message || ex;
        console.error(errMsg);
        alert(errMsg);
      }
    }
  
    // distroy function will wait pInit
    this.resolveInit!();
  }

  async componentWillUnmount() {
    this.bDestoryed = true;
    try{
      await this.pInit;
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    }catch(_){}
  }

  render() {
    return (
      <div>
        <div ref={this.uiContainer} className="div-ui-container"></div>
        Results:<br/>
        <div ref={this.resultsContainer} className="div-results-container"></div>
      </div>
    );
  }
}

export default VideoCapture;
