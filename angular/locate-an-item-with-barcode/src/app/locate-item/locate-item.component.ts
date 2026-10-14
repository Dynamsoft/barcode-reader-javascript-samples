import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-locate-item',
  templateUrl: './locate-item.component.html',
  styleUrls: ['./locate-item.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LocateItemComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  target = '';
  found = false;
  resultText = '';
  isDisposed = false;
  pInit: Promise<void> | null = null;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  ngAfterViewInit() {
    this.pInit = (async () => {
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
              let text = '';
              let matched = false;
              for (const item of result.barcodeResultItems) {
                text += `${item.formatString}: ${item.text}\n`;
                if (this.target && item.text === this.target) matched = true;
              }
              this.resultText = text;
              this.found = matched;
            });
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        await this.cameraEnhancer.open();
        await this.cvRouter.startCapturing('ReadBarcodes_Balance');
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  onTargetChange() {
    this.found = false;
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
