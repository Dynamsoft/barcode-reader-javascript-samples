import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, Feedback } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-tip-beep',
  templateUrl: './tip-beep.component.html',
  styleUrls: ['./tip-beep.component.css'],
  standalone: true,
})
export class TipBeepComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
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

        cameraView.setTipVisible(true);
        cameraView.updateTipMessage('Point the camera at a barcode');

        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              Feedback.beep();
              this.ngZone.run(() => {
                this.resultText = '';
                for (const item of result.barcodeResultItems) {
                  this.resultText += `${item.formatString}: ${item.text}\n\n`;
                }
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
        await this.cvRouter.startCapturing('ReadBarcodes_SpeedFirst');
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
