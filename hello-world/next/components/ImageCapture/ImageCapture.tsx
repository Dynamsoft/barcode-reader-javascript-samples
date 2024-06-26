import React, { useRef, useEffect, MutableRefObject, useCallback } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

function ImageCapture() {
  const resultsContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);

  let pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  let isDestroyed = useRef(false);

  const decodeImg = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = [...(e.target.files as any as File[])];
    e.target.value = ""; // reset input
    resultsContainer.current!.innerText = "";

    try {
      // ensure cvRouter is created only once
      const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());
      if (isDestroyed.current) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (isDestroyed.current) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          resultsContainer.current!.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          resultsContainer.current!.innerText += item.text + "\n"; // output the decoded barcode text
          console.log(item.text);
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) resultsContainer.current!.innerText = "No barcode found";
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }, []);

  useEffect((): any => {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    isDestroyed.current = false;

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed.current = true;
      if (pCvRouter.current) {
        try {
          (await pCvRouter.current).dispose();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <div className="image-capture-container">
      <div className="input-container">
        <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={decodeImg} />
      </div>
      <div className="results" ref={resultsContainer}></div>
    </div>
  );
}

export default ImageCapture;
