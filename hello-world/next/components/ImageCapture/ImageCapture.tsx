"use client"

import React, { useRef, useEffect } from "react";
import { BarcodeResultItem } from "@dynamsoft/dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

function ImageCapture() {
  const pInit = useRef(null as null | Promise<CaptureVisionRouter>);
  const pDestroy = useRef(null as null | Promise<void>);

  const init = async (): Promise<CaptureVisionRouter> => {
    const router = await CaptureVisionRouter.createInstance();
    return router;
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const router = (await pInit.current)!;
      router.dispose();
    }
  };

  const decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const router = (await pInit.current)!;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router.capture(
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
      if (ex.message.indexOf("network connection error")) {
        let customMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        console.log(customMsg);
        alert(customMsg);
      }
      throw ex;
    }
    e.target.value = "";
  };

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy) {
        await pDestroy;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("ImageCapture Component Unmount");
      })();
    };
  }, []);

  return (
    <div className="div-image-capture">
      <input
        type="file"
        accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
        onChange={decodeImg}
      />
    </div>
  );
}

export default ImageCapture;
