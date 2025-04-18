import { Component, ElementRef, ViewChild } from '@angular/core';
import '../dynamsoft.config';
import { CameraEnhancer, CameraView } from 'dynamsoft-camera-enhancer';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';
import { MultiFrameResultCrossFilter } from 'dynamsoft-utility';

const componentDestroyedErrorMsg = 'VideoCapture Component Destroyed';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
  standalone: true,
})
export class VideoCaptureComponent {
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  resultText = "";

  resolveInit?: () => void;
  pInit: Promise<void> = new Promise((r) => {
    this.resolveInit = r;
  });
  isDestroyed = false;

  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  async ngAfterViewInit(): Promise<void> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      } // Check if component is destroyed after every async
      this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }

      // Get default UI and append it to DOM.
      this.cameraViewContainer!.nativeElement.append(cameraView.getUIElement());

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      this.cvRouter = await CaptureVisionRouter.createInstance();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      this.cvRouter.setInput(this.cameraEnhancer);

      // Define a callback for results.
      this.cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;

          this.resultText = '';
          console.log(result);
          for (let item of result.barcodeResultItems) {
            this.resultText += `${item.formatString}: ${item.text}\n\n`;
          }
        },
      });

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification('barcode', true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication('barcode', true);
      await this.cvRouter.addResultFilter(filter);
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }

      // Open camera and start scanning single barcode.
      await this.cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      await this.cvRouter.startCapturing('ReadSingleBarcode');
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
    } catch (ex: any) {
      if ((ex as Error)?.message === componentDestroyedErrorMsg) {
        console.log(componentDestroyedErrorMsg);
      } else {
        let errMsg = ex.message || ex;
        console.error(errMsg);
        alert(errMsg);
      }
    }

    // Resolve pInit promise once initialization is complete.
    this.resolveInit!();
  }

  // dispose cvRouter when it's no longer needed
  async ngOnDestroy() {
    this.isDestroyed = true;
    try {
      // Wait for the pInit to complete before disposing resources.
      await this.pInit;
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    } catch (_) {}
  }
}
