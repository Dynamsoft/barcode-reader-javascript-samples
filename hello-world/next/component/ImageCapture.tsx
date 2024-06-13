"use client";

import { useEffect, useRef, MutableRefObject, useCallback, ChangeEvent } from "react";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

export default () => {
  const resDiv: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  const bDestoried = useRef(false);

  const captureImage = useCallback(async(e: ChangeEvent<HTMLInputElement>)=>{
    let files = [...(e.target.files as any as File[])];
    e.target.value = '';
    resDiv.current!.innerText = "";
    try {
      const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());
      if (bDestoried.current) return;
      
      for(let file of files){
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (bDestoried.current) return;
  
        if(files.length > 1){
          resDiv.current!.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
          let item = _item as BarcodeResultItem;
          resDiv.current!.innerText += item.text + "\n";
          console.log(item.text);
        }
        if (!result.items.length) resDiv.current!.innerText += 'No barcode found\n';
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }, []);

  useEffect((): any => {
    // reset value so works in React.StrictMode
    bDestoried.current = false;
    // onBeforeUnmount
    return async () => {
      bDestoried.current = true;
      if(pCvRouter.current){
        try{
          (await pCvRouter.current).dispose();
        }catch(_){}
      }
    }
  }, []);

  return (
    <div className="capture-img">
      <div className="img-ipt">
        <input type="file" multiple onChange={captureImage} accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"/>
      </div>
      <div className="result-area" ref={resDiv}></div>
    </div>
  )
};
