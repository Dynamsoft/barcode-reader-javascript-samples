import React from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

  pInit: Promise<CaptureVisionRouter> | null = null;
  pDestroy: Promise<void> | null = null;

  async init(): Promise<CaptureVisionRouter> {
    const cvRouter = await CaptureVisionRouter.createInstance();
    return cvRouter;
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      const cvRouter = await this.pInit;
      cvRouter.dispose();
    }
  }

  decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const cvRouter = await this.pInit;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter!.capture(e.target.files![0], "ReadBarcodes_SpeedFirst");

      // Initialize an empty string to hold the decoded barcode texts
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }
      // If the 'texts' string is not empty, display the decoded bacode texts
      if (texts !== "") this.resultsContainer.current!.innerText = texts;

      // If no items are found, display that no barcode was detected
      if (!result.items.length) this.resultsContainer.current!.innerText = "No barcode found";
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = "";
  };

  async componentDidMount() {
    try {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (this.pDestroy) {
        await this.pDestroy;
        this.pInit = this.init();
      } else {
        this.pInit = this.init();
      }
    } catch (_) {}
  }

  async componentWillUnmount() {
    try {
      await (this.pDestroy = this.destroy());
      console.log("ImageCapture Component Unmount");
    } catch (_) {}
  }

  render() {
    return (
      <div className="image-capture-container">
        <div className="input-container">
          <input type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={this.decodeImg} />
        </div>
        <div className="results" ref={this.resultsContainer}></div>
      </div>
    );
  }
}

export default ImageCapture;
