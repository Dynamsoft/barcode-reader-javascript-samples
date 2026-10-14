import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, Feedback } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

interface ParsedField { name: string; value: string; }

@Component({
  selector: 'app-gs1-scanner',
  templateUrl: './gs1-scanner.component.html',
  styleUrls: ['./gs1-scanner.component.css'],
  standalone: true,
})
export class GS1ScannerComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  rawText = '';
  parsedFields: ParsedField[] = [];
  isDisposed = false;
  pInit: Promise<void> | null = null;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  ngAfterViewInit() {
    this.pInit = (async () => {
      try {
        await CodeParserModule.loadSpec('GS1_AI');

        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (this.isDisposed) return;

        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());
        await this.cameraEnhancer.setResolution({ width: 1920, height: 1080 });

        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);
        await this.cvRouter.initSettings('./assets/read_and_parse_gs1.json');

        await this.cvRouter.addResultReceiver({
          onParsedResultsReceived: (result) => {
            if (result.parsedResultItems && result.parsedResultItems.length > 0) {
              Feedback.beep();
              try {
                const json = JSON.parse(result.parsedResultItems[0].jsonString);
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
                  this.rawText = result.parsedResultItems[0].jsonString;
                });
              }
            }
          },
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              this.ngZone.run(() => {
                this.rawText = result.barcodeResultItems[0].text;
              });
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        filter.enableResultDeduplication('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        await this.cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await this.cvRouter.startCapturing('ReadGS1AI');
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
