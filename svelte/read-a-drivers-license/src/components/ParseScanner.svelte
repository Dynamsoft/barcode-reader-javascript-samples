<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
    CodeParserModule,
    CodeParser,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let resultText = "";
  let parsedFields: { name: string; value: string }[] = [];

  onMount(() => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;
    let parser: CodeParser;

    const pInit = (async () => {
      try {
        await CodeParserModule.loadSpec("AAMVA_DL_ID");
        parser = await CodeParser.createInstance();

        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);
        await cvRouter.initSettings("./read_dl.json");

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const item = result.barcodeResultItems[0];
              resultText = `${item.formatString}: ${item.text}`;

              try {
                const parsed = await parser.parse(item.bytes);
                const json = JSON.parse(parsed.jsonString);
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
                parsedFields = [{ name: "Raw Text", value: item.text }];
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
        await cvRouter.startCapturing("ReadDriversLicense");
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
  {#if resultText}
    <p style="margin: 10px; font-family: monospace; font-size: 13px;">{resultText}</p>
  {/if}
  {#if parsedFields.length > 0}
    <table>
      <thead><tr><th>Field</th><th>Value</th></tr></thead>
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
