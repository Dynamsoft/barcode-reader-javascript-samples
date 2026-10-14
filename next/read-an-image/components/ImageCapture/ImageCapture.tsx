import React, { useEffect, useRef, useState } from "react";
import { EnumCapturedResultItemType, CaptureVisionRouter, type BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

function ImageCapture() {
  const [resultText, setResultText] = useState("");
  const pCvRouter = useRef<Promise<CaptureVisionRouter>>(null);

  useEffect(() => {
    pCvRouter.current = CaptureVisionRouter.createInstance();
    return () => {
      pCvRouter.current?.then((cvRouter) => cvRouter.dispose());
    };
  }, []);

  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files as any as File[])];
    e.target.value = "";
    setResultText("Decoding...");

    try {
      const cvRouter = await pCvRouter.current!;
      let text = "";
      for (const file of files) {
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        if (files.length > 1) text += `\n${file.name}:\n`;
        for (const item of result.items) {
          if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          text += `${(item as BarcodeResultItem).formatString}: ${(item as BarcodeResultItem).text}\n`;
        }
        if (!result.items.length) text += "No barcode found\n";
      }
      setResultText(text);
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={captureImage}
        style={{ display: "block", margin: "20px auto", padding: 10 }} />
      <div style={{ whiteSpace: "pre-wrap", textAlign: "left", padding: 10 }}>{resultText}</div>
    </div>
  );
}

export default ImageCapture;
