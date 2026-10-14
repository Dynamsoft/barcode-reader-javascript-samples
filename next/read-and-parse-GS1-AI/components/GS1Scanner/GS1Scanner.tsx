import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, Feedback } from "dynamsoft-barcode-reader-bundle";
import "../../dynamsoft.config";

function GS1Scanner() {
  const [parsedFields, setParsedFields] = useState<{name: string; value: string}[]>([]);
  const [rawText, setRawText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    const pInit = (async () => {
      try {
        await CodeParserModule.loadSpec("GS1_AI");

        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.current?.append(cameraEnhancer.getUIElement());
        await cameraEnhancer.setResolution({ width: 1920, height: 1080 });

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);
        await cvRouter.initSettings("./read_and_parse_gs1.json");

        await cvRouter.addResultReceiver({
          onParsedResultsReceived: (result) => {
            if (result.parsedResultItems && result.parsedResultItems.length > 0) {
              Feedback.beep();
              try {
                const json = JSON.parse(result.parsedResultItems[0].jsonString);
                const fields: {name: string; value: string}[] = [];
                const extract = (obj: any) => {
                  if (obj.FieldName && obj.Value !== undefined) {
                    fields.push({ name: obj.FieldName, value: String(obj.Value) });
                  }
                  if (obj.ChildFields) {
                    for (const child of obj.ChildFields) extract(child);
                  }
                };
                if (json.ResultInfo) extract(json.ResultInfo);
                else if (json.ChildFields) json.ChildFields.forEach(extract);
                setParsedFields(fields);
              } catch {
                setRawText(result.parsedResultItems[0].jsonString);
              }
            }
          },
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              setRawText(result.barcodeResultItems[0].text);
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadGS1AI");
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
      <div ref={containerRef} style={{ width: "100%", height: "50vh" }} />
      {rawText && <p style={{ margin: 10, fontFamily: "monospace", fontSize: 13, wordBreak: "break-all" }}>{rawText}</p>}
      {parsedFields.length > 0 && (
        <table style={{ maxWidth: 500, margin: "10px auto", borderCollapse: "collapse", textAlign: "left" }}>
          <thead><tr style={{ borderBottom: "2px solid #333" }}><th style={{ padding: 6 }}>AI Field</th><th style={{ padding: 6 }}>Value</th></tr></thead>
          <tbody>{parsedFields.map((f, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 6, fontWeight: "bold" }}>{f.name}</td>
              <td style={{ padding: 6, fontFamily: "monospace" }}>{f.value}</td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  );
}

export default GS1Scanner;
