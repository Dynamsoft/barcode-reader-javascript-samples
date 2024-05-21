import React, { ChangeEvent } from "react";
import "../../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  resDiv: React.RefObject<HTMLDivElement> = React.createRef();

  pCvRouter: Promise<CaptureVisionRouter> | null = null;
  bDestoried = false;

  async captureImage(e: ChangeEvent<HTMLInputElement>) {
    let files = [...(e.target.files as any as File[])];
    e.target.value = '';
    this.resDiv.current!.innerText = "";
    try {
      const cvRouter = await (this.pCvRouter = this.pCvRouter || CaptureVisionRouter.createInstance());
      if (this.bDestoried) return;
      
      for(let file of files){
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (this.bDestoried) return;
  
        if(files.length > 1){
          this.resDiv.current!.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
          let item = _item as BarcodeResultItem;
          this.resDiv.current!.innerText += item.text + "\n";
          console.log(item.text);
        }
        if (!result.items.length) this.resDiv.current!.innerText += 'No barcode found\n';
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async componentWillUnmount() {
    this.bDestoried = true;
    if(this.pCvRouter){
      try{
        (await this.pCvRouter).dispose();
      }catch(_){}
    }
  }

  render() {
    return (
      <div className="capture-img">
        <div className="img-ipt">
          <input type="file" multiple onChange={this.captureImage} accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"/>
        </div>
        <div className="result-area" ref={this.resDiv}></div>
      </div>
    );
  }
}

export default ImageCapture;
