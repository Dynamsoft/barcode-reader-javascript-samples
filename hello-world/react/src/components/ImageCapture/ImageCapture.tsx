import React from "react";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  pRouter: Promise<CaptureVisionRouter> | null = null;
  resRef: React.RefObject<HTMLDivElement> = React.createRef();
  iptRef: React.RefObject<HTMLInputElement> = React.createRef();

  async init(): Promise<CaptureVisionRouter> {
    const cvRouter = await CaptureVisionRouter.createInstance();
    return cvRouter;
  }

  captureImage = async (e: any) => {
    try {
      this.resRef.current!.innerText = "";
      const cvRouter = await this.pRouter;
      const result = await cvRouter!.capture(e.target.files[0]);
      for (let item of result.items) {
        let _item = item as BarcodeResultItem;
        console.log(_item.text);
        this.resRef.current!.innerText += `${_item.formatString} : ${_item.text}\n`
      }
      this.iptRef.current!.value = '';
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async componentDidMount() {
    this.pRouter = CaptureVisionRouter.createInstance();
  }

  async componentWillUnmount() {
    (await this.pRouter)!.dispose();
    console.log('ImageCapture Component Unmount');
  }

  render() {
    return (
      <div className="capture-img">
        <div className="img-ipt"><input type="file" ref={this.iptRef} onChange={this.captureImage} /></div>
        <div className="result-area" ref={this.resRef}></div>
      </div>
    );
  }
}

export default ImageCapture;
