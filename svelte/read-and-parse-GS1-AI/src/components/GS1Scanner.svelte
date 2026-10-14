<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
    CodeParserModule,
    Feedback,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let rawText = "";
  let parsedFields: { name: string; value: string }[] = [];

  onMount(() => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    const pInit = (async () => {
      try {
        await CodeParserModule.loadSpec("GS1_AI");

        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.append(cameraEnhancer.getUIElement());
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
                const fields: { name: string; value: string }[] = [];
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
                parsedFields = fields;
              } catch {
                rawText = result.parsedResultItems[0].jsonString;
              }
            }
          },
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              rawText = result.barcodeResultItems[0].text;
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
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      pInit.then(() => {
        cameraEnhancer?.dispose();
        cvRouter?.dispose();
      });
    };
  });
</script>

<div>
  <div bind:this={containerRef} style="width: 100%; height: 50vh; background: #eee;"></div>
  {#if rawText}
    <p style="margin: 10px; font-family: monospace; font-size: 13px; word-break: break-all;">{rawText}</p>
  {/if}
  {#if parsedFields.length > 0}
    <table>
      <thead><tr><th>AI Field</th><th>Value</th></tr></thead>
      <tbody>
        {#each parsedFields as f}
          <tr>
            <td class="field-name">{f.name}</td>
            <td class="field-value">{f.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  table { max-width: 500px; margin: 10px auto; border-collapse: collapse; text-align: left; }
  thead tr { border-bottom: 2px solid #333; }
  th, td { padding: 6px; }
  .field-name { font-weight: bold; }
  .field-value { font-family: monospace; }
  tbody tr { border-bottom: 1px solid #eee; }
</style>
