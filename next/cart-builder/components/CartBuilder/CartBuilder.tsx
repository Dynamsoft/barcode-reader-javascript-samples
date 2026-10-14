import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

interface CartItem { text: string; count: number; format: string; }

function CartBuilder() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [scanning, setScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<{ cvRouter: CaptureVisionRouter; cameraEnhancer: CameraEnhancer } | null>(null);
  const pInit = useRef<Promise<void>>(null);
  const itemsRef = useRef<CartItem[]>([]);

  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect((): any => {
    let isDisposed = false;
    pInit.current = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.current?.append(cameraEnhancer.getUIElement());
        cameraEnhancer.setVideoFit("cover");

        const cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            for (const item of result.barcodeResultItems) {
              setItems((prev) => {
                const existing = prev.find((i) => i.text === item.text);
                if (existing) return prev.map((i) => i.text === item.text ? { ...i, count: i.count + 1 } : i);
                return [...prev, { text: item.text, count: 1, format: item.formatString }];
              });
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
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

  const toggleScan = async () => {
    await pInit.current;
    if (!routerRef.current) return;
    if (scanning) {
      await routerRef.current.cvRouter.stopCapturing();
      await routerRef.current.cameraEnhancer.close();
      setScanning(false);
    } else {
      await routerRef.current.cameraEnhancer.open();
      await routerRef.current.cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      setScanning(true);
    }
  };

  return (
    <div>
      <div className="controls">
        <button onClick={toggleScan} className={scanning ? "active" : ""}>{scanning ? "Stop Scanning" : "Scan Barcode"}</button>
        <button onClick={() => setItems([])}>Clear Cart</button>
      </div>
      <div ref={containerRef} style={{ width: "100%", height: scanning ? "40vh" : 0, overflow: "hidden", transition: "height 0.3s" }} />
      <div style={{ maxWidth: 500, margin: "10px auto", textAlign: "left" }}>
        <h3>Cart ({items.reduce((s, i) => s + i.count, 0)} items)</h3>
        {items.length === 0 ? <p style={{ color: "#999" }}>No items. Start scanning!</p> :
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
            <thead><tr style={{ borderBottom: "2px solid #333" }}><th style={{ textAlign: "left", padding: 6 }}>Barcode</th><th>Format</th><th>Qty</th></tr></thead>
            <tbody>{items.map((item, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 6, fontFamily: "monospace" }}>{item.text}</td>
                <td style={{ textAlign: "center" }}>{item.format}</td>
                <td style={{ textAlign: "center" }}>{item.count}</td>
              </tr>
            ))}</tbody>
          </table>}
      </div>
    </div>
  );
}

export default CartBuilder;
