import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

interface InvItem { text: string; format: string; count: number; }

@Component({
  selector: 'app-batch-inventory',
  templateUrl: './batch-inventory.component.html',
  styleUrls: ['./batch-inventory.component.css'],
  standalone: true,
})
export class BatchInventoryComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  items: InvItem[] = [];
  isDisposed = false;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  get totalScans() {
    return this.items.reduce((s, i) => s + i.count, 0);
  }

  ngAfterViewInit() {
    (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (this.isDisposed) return;

        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());

        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);

        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            this.ngZone.run(() => {
              for (const item of result.barcodeResultItems) {
                const key = `${item.formatString}|${item.text}`;
                const idx = this.items.findIndex((i) => `${i.format}|${i.text}` === key);
                if (idx >= 0) {
                  this.items[idx].count++;
                } else {
                  this.items.push({ text: item.text, format: item.formatString, count: 1 });
                }
              }
            });
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        filter.enableResultDeduplication('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        await this.cameraEnhancer.open();
        await this.cvRouter.startCapturing('ReadBarcodes_SpeedFirst');
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  clearItems() {
    this.items = [];
  }

  ngOnDestroy() {
    this.isDisposed = true;
    this.cameraEnhancer?.getUIElement().remove();
    this.cvRouter?.dispose();
    this.cameraEnhancer?.dispose();
  }
}
