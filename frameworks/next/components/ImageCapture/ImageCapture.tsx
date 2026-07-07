import React, { useRef, useEffect, MutableRefObject, useState } from "react";
import { EnumCapturedResultItemType, CaptureVisionRouter, BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "./ImageCapture.css";

function ImageCapture() {
  let [resultText, setResultText] = useState("");
  let pCvRouter = useRef<Promise<CaptureVisionRouter>>();

  useEffect(() => {
    pCvRouter.current = CaptureVisionRouter.createInstance();
    return () => {
      console.log("image capture component disposed");
      // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
      pCvRouter.current?.then((cvRouter) => {
        cvRouter.dispose();
      })
    }
  }, [])

  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = [...(e.target.files as any as File[])];
    e.target.value = ""; // reset input
    setResultText("decoding...");

    try {
      // ensure cvRouter is created only once
      const cvRouter = await pCvRouter.current!;

      let _resultText = "";
      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        console.log(result);

        // Print file name if there's multiple files
        if (files.length > 1) {
          _resultText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          _resultText += item.formatString + ": " + item.text + "\n"
        }
        setResultText(_resultText);
        // If no items are found, display that no barcode was detected
        if (!result.items.length) setResultText(_resultText + "No barcode found");
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  return (
    <div className="image-capture-container">
      <div className="input-container">
        <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={captureImage} />
      </div>
      <div className="results">{resultText}</div>
    </div>
  );
}

export default ImageCapture;
