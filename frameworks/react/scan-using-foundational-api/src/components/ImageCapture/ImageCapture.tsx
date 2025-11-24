import React, { useRef, useEffect, MutableRefObject, useState } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { EnumCapturedResultItemType, CaptureVisionRouter, BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "./ImageCapture.css";

function ImageCapture() {
  const [resultText, setResultText] = useState("");

  let pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  let isDestroyed = useRef(false);

  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = [...(e.target.files as any as File[])];
    e.target.value = ""; // reset input
    setResultText("");

    try {
      // ensure cvRouter is created only once
      const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());
      if (isDestroyed.current) return;

      let _resultText = "";
      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        console.log(result);
        if (isDestroyed.current) return;

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

  useEffect((): any => {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    isDestroyed.current = false;

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return () => {
      isDestroyed.current = true;
      if (pCvRouter.current) {
        pCvRouter.current.then((cvRouter) => {
          cvRouter.dispose();
        }).catch((_) => { })
      }
    };
  }, []);

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
