import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

function SingleBarcode() {
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<{ cvRouter: CaptureVisionRouter; cameraEnhancer: CameraEnhancer } | null>(null);
  const pInit = useRef<Promise<void>>(null);

  useEffect((): any => {
    let isDisposed = false;

    pInit.current = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;

        containerRef.current?.append(cameraEnhancer.getUIElement());

        const cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (res) => {
            if (res.barcodeResultItems.length > 0) {
              const text = res.barcodeResultItems[0].text;
              setResult(text);
              setScanning(false);
              await cvRouter.stopCapturing();
              await cameraEnhancer.close();
            }
          },
        });

        routerRef.current = { cvRouter, cameraEnhancer };
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();

    return () => {
      isDisposed = true;
      routerRef.current?.cameraEnhancer.getUIElement().remove();
      pInit.current?.then(() => {
        routerRef.current?.cameraEnhancer.dispose();
        routerRef.current?.cvRouter.dispose();
      });
    };
  }, []);

  const startScan = async () => {
    setResult("");
    setScanning(true);
    await pInit.current;
    if (!routerRef.current) return;
    await routerRef.current.cameraEnhancer.open();
    await routerRef.current.cvRouter.startCapturing("ReadSingleBarcode");
  };

  return (
    <div>
      {!scanning && (
        <button onClick={startScan} style={{ padding: "10px 24px", fontSize: 16, margin: 10, cursor: "pointer" }}>
          {result ? "Scan Again" : "Start Scan"}
        </button>
      )}
      <div ref={containerRef} style={{ width: "100%", height: scanning ? "70vh" : 0, overflow: "hidden" }} />
      {result && <p style={{ margin: 20, fontSize: 18 }}>Result: <strong>{result}</strong></p>}
    </div>
  );
}

export default SingleBarcode;
