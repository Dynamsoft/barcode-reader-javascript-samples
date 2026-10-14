import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, CodeParser } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

function ParseScanner() {
  const [resultText, setResultText] = useState("");
  const [parsedFields, setParsedFields] = useState<{name: string; value: string}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;
    let parser: CodeParser;

    const pInit = (async () => {
      try {
        await CodeParserModule.loadSpec("VIN");
        parser = await CodeParser.createInstance();

        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.current?.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);
        await cvRouter.initSettings("./read_vin.json");

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const item = result.barcodeResultItems[0];
              setResultText(`${item.formatString}: ${item.text}`);

              try {
                const parsed = await parser.parse(item.bytes);
                const json = JSON.parse(parsed.jsonString);
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
                setParsedFields([{ name: "Raw Text", value: item.text }]);
              }
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadVIN");
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
      {resultText && <p style={{ margin: 10, fontFamily: "monospace", fontSize: 13 }}>{resultText}</p>}
      {parsedFields.length > 0 && (
        <table style={{ maxWidth: 500, margin: "10px auto", borderCollapse: "collapse", textAlign: "left" }}>
          <thead><tr style={{ borderBottom: "2px solid #333" }}><th style={{ padding: 6 }}>Field</th><th style={{ padding: 6 }}>Value</th></tr></thead>
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

export default ParseScanner;
