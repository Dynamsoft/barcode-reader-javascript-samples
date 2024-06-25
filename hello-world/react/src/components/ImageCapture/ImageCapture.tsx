import React, { ChangeEvent } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

  pCvRouter: Promise<CaptureVisionRouter> | null = null;
  isDestroyed = false;

  async captureImage(e: ChangeEvent<HTMLInputElement>) {
    let files = [...(e.target.files as any as File[])];
    e.target.value = ""; // reset input
    this.resultsContainer.current!.innerText = "";

    try {
      const cvRouter = await (this.pCvRouter = this.pCvRouter || CaptureVisionRouter.createInstance());
      if (this.isDestroyed) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (this.isDestroyed) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          this.resultsContainer.current!.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          this.resultsContainer.current!.innerText += item.text + "\n";
          console.log(item.text);
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) this.resultsContainer.current!.innerText += "No barcode found\n";
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async componentWillUnmount() {
    this.isDestroyed = true;
    if (this.pCvRouter) {
      try {
        (await this.pCvRouter).dispose();
      } catch (_) {}
    }
  }

  render() {
    return (
      <div className="image-capture-container">
        <div className="input-container">
          <input
            type="file"
            multiple
            onChange={this.captureImage.bind(this)}
            accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
          />
        </div>
        <div className="results" ref={this.resultsContainer}></div>
      </div>
    );
  }
}

export default ImageCapture;
