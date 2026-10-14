import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

function PickFill() {
  const [fields, setFields] = useState({ sn: "", mac: "", eid: "" });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<{ cvRouter: CaptureVisionRouter; cameraEnhancer: CameraEnhancer } | null>(null);
  const pInit = useRef<Promise<void>>(null);
  const activeFieldRef = useRef<string | null>(null);

  useEffect(() => { activeFieldRef.current = activeField; }, [activeField]);

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
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0 && activeFieldRef.current) {
              const text = result.barcodeResultItems[0].text;
              setFields((prev) => ({ ...prev, [activeFieldRef.current!]: text }));
              setScanning(false);
              await cvRouter.stopCapturing();
              await cameraEnhancer.close();
            }
          },
        });

        routerRef.current = { cvRouter, cameraEnhancer };
      } catch (ex: any) { alert(ex.message || ex); }
    })();

    return () => {
      isDisposed = true;
      routerRef.current?.cameraEnhancer.getUIElement().remove();
      pInit.current?.then(() => { routerRef.current?.cameraEnhancer.dispose(); routerRef.current?.cvRouter.dispose(); });
    };
  }, []);

  const scanForField = async (field: string) => {
    setActiveField(field);
    setScanning(true);
    await pInit.current;
    if (!routerRef.current) return;
    await routerRef.current.cameraEnhancer.open();
    await routerRef.current.cvRouter.startCapturing("ReadSingleBarcode");
  };

  const inputStyle = { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, width: 220 };

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height: scanning ? "40vh" : 0, overflow: "hidden", transition: "height 0.3s" }} />
      <div style={{ maxWidth: 400, margin: "20px auto", textAlign: "left" }}>
        {(["sn", "mac", "eid"] as const).map((f) => (
          <div key={f} style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ width: 50, fontWeight: "bold" }}>{f.toUpperCase()}</label>
            <input value={fields[f]} onChange={(e) => setFields((p) => ({ ...p, [f]: e.target.value }))} style={inputStyle} placeholder={`Scan or type ${f.toUpperCase()}...`} />
            <button onClick={() => scanForField(f)} style={{ padding: "6px 12px", cursor: "pointer" }}>Scan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickFill;
