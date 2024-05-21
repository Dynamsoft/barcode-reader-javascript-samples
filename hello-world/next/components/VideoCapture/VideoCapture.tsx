"use client"

import { useEffect, useRef, MutableRefObject } from 'react';
import "../../dynamsoft.config";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

const strErrorDistoryed = 'videoCapture component destoryed';

export default () => {
  const uiContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const resultsContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): any => {
    let resolveInit:()=>void;
    const pInit:Promise<void> = new Promise(r=>{resolveInit=r});
    let bDestoryed = false;
    
    let cvRouter:CaptureVisionRouter;
    let cameraEnhancer:CameraEnhancer;
    
    (async()=>{
      try{
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        if(bDestoryed){ throw Error(strErrorDistoryed); } // Check if component is destroyed after every async
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if(bDestoryed){ throw Error(strErrorDistoryed); }
  
        // Get default UI and append it to DOM.
        uiContainer.current!.append(cameraView.getUIElement());
  
        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        if(bDestoryed){ throw Error(strErrorDistoryed); }
        cvRouter.setInput(cameraEnhancer);
  
        // Define a callback for results.
        cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;
  
          resultsContainer.current!.textContent = '';
          console.log(result);
          for (let item of result.barcodeResultItems) {
            resultsContainer.current!.append(
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
        await cvRouter.addResultFilter(filter);
        if(bDestoryed){ throw Error(strErrorDistoryed); }
  
        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        if(bDestoryed){ throw Error(strErrorDistoryed); }
        await cvRouter.startCapturing("ReadSingleBarcode");
        if(bDestoryed){ throw Error(strErrorDistoryed); }
  
      }catch(ex:any){
        
        if((ex as Error)?.message === strErrorDistoryed){
          console.log(strErrorDistoryed);
        }else{
          let errMsg = ex.message || ex;
          console.error(errMsg);
          alert(errMsg);
        }
      }
    })();

    // distroy function will wait pInit
    resolveInit!();

    // onBeforeUnmount
    return async () => {
      bDestoryed = true;
      try{
        await pInit;
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      }catch(_){}
    };
  }, []);

  return (
    <div>
      <div ref={uiContainer} className="div-ui-container"></div>
      Results:<br />
      <div ref={resultsContainer} className="div-results-container"></div>
    </div>
  );
}
