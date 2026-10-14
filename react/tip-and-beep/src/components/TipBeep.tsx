import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, Feedback } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

function TipBeep() {
  const [resultText, setResultText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    const pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;

        containerRef.current?.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        cameraView.setTipVisible(true);
        cameraView.updateTipMessage("Point the camera at a barcode");

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              Feedback.beep();
              let text = "";
              for (const item of result.barcodeResultItems) {
                text += `${item.formatString}: ${item.text}\n\n`;
              }
              setResultText(text);
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      } catch (ex: any) { alert(ex.message || ex); }
    })();

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      pInit.then(() => { cameraEnhancer?.dispose(); cvRouter?.dispose(); });
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height: "70vh" }} />
      <br />
      Results:
      <div style={{ whiteSpace: "pre-wrap", height: "10vh", overflow: "auto" }}>{resultText}</div>
    </div>
  );
}

export default TipBeep;
