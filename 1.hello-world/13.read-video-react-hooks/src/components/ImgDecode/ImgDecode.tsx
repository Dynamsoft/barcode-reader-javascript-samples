import React, { useRef, useEffect } from "react";
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import "./ImgDecode.css";

function ImgDecode() {
  const pReader = useRef(null as null | Promise<BarcodeReader>);

  const decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const reader = (await pReader.current)!;
      let results = await reader.decode(e.target.files![0]);
      for (let result of results) {
        alert(result.barcodeText);
      }
      if (!results.length) {
        alert("No barcode found");
      }
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
    pReader.current = BarcodeReader.createInstance();
    return () => {
      (async () => {
        if (pReader.current) {
          (await pReader.current).destroyContext();
          console.log("ImgDecode Component Unmount");
        }
      })();
    };
  }, []);

  return (
    <div className="ImgDecode">
      <input type="file" onChange={decodeImg} />
    </div>
  );
}

export default ImgDecode;