import React, { useRef, useEffect, MutableRefObject } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

function ImageCapture() {
  const resultsContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const pInit = useRef(null as null | Promise<CaptureVisionRouter>);
  const pDestroy = useRef(null as null | Promise<void>);

  const init = async (): Promise<CaptureVisionRouter> => {
    const cvRouter = await CaptureVisionRouter.createInstance();
    return cvRouter;
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const cvRouter = (await pInit.current)!;
      cvRouter.dispose();
    }
  };

  const decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const cvRouter = (await pInit.current)!;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(e.target.files![0], "ReadBarcodes_SpeedFirst");

      // Initialize an empty string to hold the decoded barcode texts
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }
      // If the 'texts' string is not empty, display the decoded bacode texts
      if (texts !== "") resultsContainer.current!.innerText = texts;

      // If no items are found, display that no barcode was detected
      if (!result.items.length) resultsContainer.current!.innerText = "No barcode found";
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = "";
  };

  useEffect(() => {
    (async () => {
      try {
        // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
        if (pDestroy) {
          await pDestroy;
          pInit.current = init();
        } else {
          pInit.current = init();
        }
      } catch (_) {}
    })();

    return () => {
      try {
        (async () => {
          await (pDestroy.current = destroy());
          console.log("ImageCapture Component Unmount");
        })();
      } catch (_) {}
    };
  }, []);

  return (
    <div className="image-capture-container">
      <div className="input-container">
        <input type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={decodeImg} />
      </div>
      <div className="results" ref={resultsContainer}></div>
    </div>
  );
}

export default ImageCapture;
