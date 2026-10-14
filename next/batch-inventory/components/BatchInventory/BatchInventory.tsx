import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

interface InvItem { text: string; format: string; count: number; }

function BatchInventory() {
  const [items, setItems] = useState<InvItem[]>([]);
  const [scanning, setScanning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<{ cvRouter: CaptureVisionRouter; cameraEnhancer: CameraEnhancer } | null>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.current?.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            for (const item of result.barcodeResultItems) {
              setItems((prev) => {
                const key = `${item.formatString}|${item.text}`;
                const idx = prev.findIndex((i) => `${i.format}|${i.text}` === key);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = { ...updated[idx], count: updated[idx].count + 1 };
                  return updated;
                }
                return [...prev, { text: item.text, format: item.formatString, count: 1 }];
              });
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
        routerRef.current = { cvRouter, cameraEnhancer };
      } catch (ex: any) { alert(ex.message || ex); }
    })();

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      cameraEnhancer?.dispose();
      cvRouter?.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height: "40vh" }} />
      <div style={{ maxWidth: 500, margin: "10px auto", textAlign: "left" }}>
        <h3>Inventory ({items.length} unique, {items.reduce((s, i) => s + i.count, 0)} total scans)</h3>
        <button onClick={() => setItems([])} style={{ margin: "8px 0", padding: "6px 12px", cursor: "pointer" }}>Clear</button>
        {items.length === 0 ? <p style={{ color: "#999" }}>Scan barcodes to add to inventory.</p> :
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #333" }}><th style={{ textAlign: "left", padding: 6 }}>#</th><th style={{ textAlign: "left" }}>Barcode</th><th>Format</th><th>Count</th></tr></thead>
            <tbody>{items.map((item, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{i + 1}</td>
                <td style={{ fontFamily: "monospace" }}>{item.text}</td>
                <td style={{ textAlign: "center" }}>{item.format}</td>
                <td style={{ textAlign: "center" }}>{item.count}</td>
              </tr>
            ))}</tbody>
          </table>}
      </div>
    </div>
  );
}

export default BatchInventory;
