import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, CodeParser } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

interface ParsedField { name: string; value: string; }

@Component({
  selector: 'app-parse-scanner',
  templateUrl: './parse-scanner.component.html',
  styleUrls: ['./parse-scanner.component.css'],
  standalone: true,
})
export class ParseScannerComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  resultText = '';
  parsedFields: ParsedField[] = [];
  isDisposed = false;
  pInit: Promise<void> | null = null;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  ngAfterViewInit() {
    this.pInit = (async () => {
      try {
        await CodeParserModule.loadSpec('VIN');
        const parser = await CodeParser.createInstance();

        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (this.isDisposed) return;

        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());

        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);
        await this.cvRouter.initSettings('./assets/read_vin.json');

        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const item = result.barcodeResultItems[0];
              this.ngZone.run(() => {
                this.resultText = `${item.formatString}: ${item.text}`;
              });

              try {
                const parsed = await parser.parse(item.bytes);
                const json = JSON.parse(parsed.jsonString);
                const fields: ParsedField[] = [];
                const extract = (obj: any) => {
                  if (Array.isArray(obj)) {
                    for (const child of obj) extract(child);
                    return;
                  }
                  if (obj.FieldName && obj.Value !== undefined) {
                    fields.push({ name: obj.FieldName, value: String(obj.Value) });
                  }
                  if (obj.ChildFields) {
                    for (const child of obj.ChildFields) extract(child);
                  }
                };
                if (json.ResultInfo) extract(json.ResultInfo);
                else if (json.ChildFields) json.ChildFields.forEach(extract);
                this.ngZone.run(() => { this.parsedFields = fields; });
              } catch {
                this.ngZone.run(() => {
                  this.parsedFields = [{ name: 'Raw Text', value: item.text }];
                });
              }
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        filter.enableResultDeduplication('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        await this.cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await this.cvRouter.startCapturing('ReadVIN');
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  ngOnDestroy() {
    this.isDisposed = true;
    this.cameraEnhancer?.getUIElement().remove();
    this.pInit?.then(() => {
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    });
  }
}
