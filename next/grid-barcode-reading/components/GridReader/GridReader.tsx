import React, { useEffect, useRef, useState } from "react";
import { EnumCapturedResultItemType, CaptureVisionRouter, type BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

function GridReader() {
  const [resultText, setResultText] = useState("");
  const [status, setStatus] = useState("");
  const pCvRouter = useRef<Promise<CaptureVisionRouter>>(null);

  useEffect(() => {
    pCvRouter.current = CaptureVisionRouter.createInstance();
    return () => {
      pCvRouter.current?.then((r) => r.dispose());
    };
  }, []);

  const processImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setStatus("Phase 1: Fast scan...");
    setResultText("");

    try {
      const cvRouter = await pCvRouter.current!;

      // Phase 1: Fast scan
      await cvRouter.initSettings("./GridFastScan.json");
      const fastResult = await cvRouter.capture(file, "GridFastScan");
      const barcodes = fastResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      setStatus(`Phase 1 found ${barcodes.length} barcodes. Running deep decode...`);

      // Phase 2: Deep decode
      await cvRouter.initSettings("./GridDeepDecode.json");
      const deepResult = await cvRouter.capture(file, "GridDeepDecode");
      const deepBarcodes = deepResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      const allBarcodes = deepBarcodes.length > barcodes.length ? deepBarcodes : barcodes;

      let text = `Total barcodes found: ${allBarcodes.length}\n\n`;
      allBarcodes.forEach((item, i) => {
        text += `[${i + 1}] ${item.formatString}: ${item.text}\n`;
      });

      setResultText(text);
      setStatus(`Done! Found ${allBarcodes.length} barcodes.`);
    } catch (ex: any) {
      alert(ex.message || ex);
      setStatus("Error");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <input type="file" accept=".jpg,.jpeg,.png,.bmp" onChange={processImage}
        style={{ display: "block", margin: "20px auto", padding: 10 }} />
      {status && <p style={{ margin: 10, fontWeight: "bold" }}>{status}</p>}
      <div style={{ whiteSpace: "pre-wrap", textAlign: "left", padding: 10, fontFamily: "monospace", fontSize: 13 }}>{resultText}</div>
    </div>
  );
}

export default GridReader;
