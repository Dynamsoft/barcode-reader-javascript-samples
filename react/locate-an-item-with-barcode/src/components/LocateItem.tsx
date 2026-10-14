import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

function LocateItem() {
  const [target, setTarget] = useState("");
  const [found, setFound] = useState(false);
  const [resultText, setResultText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;
    let targetRef = "";

    const pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.current?.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            let text = "";
            let matched = false;
            for (const item of result.barcodeResultItems) {
              text += `${item.formatString}: ${item.text}\n`;
              if (targetRef && item.text === targetRef) matched = true;
            }
            setResultText(text);
            setFound(matched);
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        await cvRouter.startCapturing("ReadBarcodes_Balance");
      } catch (ex: any) { alert(ex.message || ex); }
    })();

    // Expose target setter
    (window as any).__setLocateTarget = (t: string) => { targetRef = t; };

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      pInit.then(() => { cameraEnhancer?.dispose(); cvRouter?.dispose(); });
      delete (window as any).__setLocateTarget;
    };
  }, []);

  const updateTarget = (val: string) => {
    setTarget(val);
    setFound(false);
    (window as any).__setLocateTarget?.(val);
  };

  return (
    <div>
      <div className="controls">
        <input value={target} onChange={(e) => updateTarget(e.target.value)} placeholder="Enter target barcode value..."
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, width: 280 }} />
      </div>
      {target && (
        <p style={{ margin: 8, fontSize: 16, fontWeight: "bold", color: found ? "green" : "#c00" }}>
          {found ? "✓ Item found in view!" : "Searching for item..."}
        </p>
      )}
      <div ref={containerRef} style={{ width: "100%", height: "50vh" }} />
      <div style={{ whiteSpace: "pre-wrap", fontSize: 12, maxHeight: "10vh", overflow: "auto", fontFamily: "monospace" }}>{resultText}</div>
    </div>
  );
}

export default LocateItem;
