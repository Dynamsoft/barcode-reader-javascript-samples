import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, EnumCapturedResultItemType, type BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

function VideoOverlay() {
  const [resultText, setResultText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<HTMLDivElement>(null);

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

        await cvRouter.addResultReceiver({
          onCapturedResultReceived: (result) => {
            // Clear overlays
            if (overlaysRef.current) overlaysRef.current.innerHTML = "";

            const items = result.items.filter(
              (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
            ) as BarcodeResultItem[];

            let text = "";
            for (const item of items) {
              text += `${item.formatString}: ${item.text}\n`;

              // Position overlay
              try {
                const pts = item.location.points;
                const clientPts = pts.map((p: any) => cameraEnhancer.convertToClientCoordinates(p));
                const minX = Math.min(...clientPts.map((p: any) => p.x));
                const minY = Math.min(...clientPts.map((p: any) => p.y));
                const maxX = Math.max(...clientPts.map((p: any) => p.x));

                const overlay = document.createElement("div");
                overlay.style.cssText = `position:fixed;left:${minX}px;top:${minY - 24}px;max-width:${maxX - minX}px;background:rgba(254,174,55,0.9);color:#000;font:bold 11px/1.3 monospace;padding:2px 5px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
                overlay.textContent = item.text;
                overlaysRef.current?.appendChild(overlay);
              } catch (_) {}
            }
            setResultText(text);
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
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
    <div style={{ position: "relative" }}>
      <div ref={overlaysRef} />
      <div ref={containerRef} style={{ width: "100%", height: "70vh" }} />
      <br />
      Results:
      <div style={{ whiteSpace: "pre-wrap", height: "10vh", overflow: "auto" }}>{resultText}</div>
    </div>
  );
}

export default VideoOverlay;
