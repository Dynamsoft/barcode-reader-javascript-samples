import React from "react";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  pInit: Promise<CaptureVisionRouter> | null = null;
  pDestroy: Promise<void> | null = null;

  async init(): Promise<CaptureVisionRouter> {
    const router = await CaptureVisionRouter.createInstance();
    return router;
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      const router = await this.pInit;
      router.dispose();
    }
  }

  decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const router = await this.pInit;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router!.capture(
        e.target.files![0],
        "ReadBarcodes_SpeedFirst"
      );
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }
      if (texts !== "") alert(texts);
      if (!result.items.length) alert("No barcode found");
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = "";
  };

  async componentDidMount() {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    if (this.pDestroy) {
      await this.pDestroy;
      this.pInit = this.init();
    } else {
      this.pInit = this.init();
    }
  }

  async componentWillUnmount() {
    await (this.pDestroy = this.destroy());
    console.log("ImageCapture Component Unmount");
  }

  render() {
    return (
      <div className="div-image-capture">
        <input
          type="file"
          accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
          onChange={this.decodeImg}
        />
      </div>
    );
  }
}

export default ImageCapture;
