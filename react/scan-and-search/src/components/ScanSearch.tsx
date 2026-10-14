import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const DATABASE: Record<string, string> = {
  "978-0-13-468599-1": "The Pragmatic Programmer",
  "978-0-596-51774-8": "JavaScript: The Good Parts",
  "978-1-491-95028-2": "Fluent Python",
  "4006381333931": "USB Cable",
  "5901234123457": "Dark Chocolate Bar",
};

function ScanSearch() {
  const [query, setQuery] = useState("");
  const [match, setMatch] = useState<string | null>(null);
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
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const text = result.barcodeResultItems[0].text;
              setQuery(text);
              setMatch(DATABASE[text] || null);
              setScanning(false);
              await cvRouter.stopCapturing();
              await cameraEnhancer.close();
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        await cvRouter.addResultFilter(filter);

        routerRef.current = { cvRouter, cameraEnhancer };
      } catch (ex: any) { alert(ex.message || ex); }
    })();

    return () => {
      isDisposed = true;
      routerRef.current?.cameraEnhancer.getUIElement().remove();
      pInit.current?.then(() => { routerRef.current?.cameraEnhancer.dispose(); routerRef.current?.cvRouter.dispose(); });
    };
  }, []);

  const startScan = async () => {
    setMatch(null);
    setScanning(true);
    await pInit.current;
    if (!routerRef.current) return;
    await routerRef.current.cameraEnhancer.open();
    await routerRef.current.cvRouter.startCapturing("ReadSingleBarcode");
  };

  const lookup = () => { setMatch(DATABASE[query] || null); };

  return (
    <div>
      <div className="controls">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Barcode value..."
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, width: 250 }} />
        <button onClick={lookup}>Search</button>
        <button onClick={startScan} className={scanning ? "active" : ""}>{scanning ? "Scanning..." : "Scan"}</button>
      </div>
      <div ref={containerRef} style={{ width: "100%", height: scanning ? "50vh" : 0, overflow: "hidden", transition: "height 0.3s" }} />
      {query && !scanning && (
        <div style={{ margin: 20, padding: 16, border: "1px solid #eee", borderRadius: 8, maxWidth: 400, marginInline: "auto" }}>
          <p><strong>Barcode:</strong> {query}</p>
          {match ? <p style={{ color: "green", marginTop: 8 }}>Found: <strong>{match}</strong></p>
            : <p style={{ color: "#c00", marginTop: 8 }}>No match found in database.</p>}
        </div>
      )}
    </div>
  );
}

export default ScanSearch;
