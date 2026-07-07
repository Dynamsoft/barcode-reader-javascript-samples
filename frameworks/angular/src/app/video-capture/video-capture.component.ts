import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, MultiFrameResultCrossFilter, CaptureVisionRouter } from 'dynamsoft-barcode-reader-bundle';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
  standalone: true,
})
export class VideoCaptureComponent {
  constructor(private ngZone: NgZone) { }

  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  pInit: Promise<void> | null = null;
  resultText = "";
  isDisposed = false;

  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  ngAfterViewInit() {
    this.pInit = (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);

        if (this.isDisposed) return;

        // Get default UI and append it to DOM.
        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);

        // Define a callback for results.
        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;
            console.log(result);
            this.ngZone.run(() => {
              this.resultText = '';
              for (let item of result.barcodeResultItems) {
                this.resultText += `${item.formatString}: ${item.text}\n\n`;
              }
            });
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification('barcode', true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        // Open camera and start scanning barcode.
        await this.cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await this.cvRouter.startCapturing('ReadBarcodes_SpeedFirst');
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();
  }

  // dispose cvRouter when it's no longer needed
  ngOnDestroy() {
    console.log("video capture component disposed");
    this.isDisposed = true;
    this.cameraEnhancer?.getUIElement().remove();
    // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
    this.pInit?.then(() => {
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    });
  }
}
