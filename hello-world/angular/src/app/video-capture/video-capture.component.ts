import { Component, ElementRef, ViewChild } from '@angular/core';
import { DecodedBarcodesResult } from 'dynamsoft-barcode-reader';
import {
  CameraEnhancer,
  CameraView,
} from 'dynamsoft-camera-enhancer';
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from 'dynamsoft-capture-vision-router';
import { MultiFrameResultCrossFilter } from 'dynamsoft-utility';
import '../../cvr'; // import side effects. The license, engineResourcePath, so on.

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
})
export class VideoCaptureComponent {
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> | null = null;

  @ViewChild('uiContainer') uiContainer: ElementRef<HTMLDivElement> | null =
    null;
  @ViewChild('resultsContainer') resultsContainer: ElementRef<HTMLDivElement> | null =
    null;

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      this.uiContainer!.nativeElement.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (result: DecodedBarcodesResult) => {
        if (!result.barcodeResultItems.length) return;

        this.resultsContainer!.nativeElement.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          this.resultsContainer!.nativeElement.append(
            `${item.formatString}: ${item.text}`,
            document.createElement('br'),
            document.createElement('hr'),
          );
        }
      };
      cvRouter.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification("barcode", true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication("barcode", true);
      filter.setDuplicateForgetTime("barcode", 3000);
      await cvRouter.addResultFilter(filter);

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      await cvRouter.startCapturing('ReadSingleBarcode');
      return {
        cameraView,
        cameraEnhancer,
        cvRouter,
      };
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  }

  async ngOnInit(): Promise<void> {
    this.pInit = this.init();
  }

  async ngOnDestroy() {
    if (this.pInit) {
      const { cameraView, cameraEnhancer, cvRouter } = await this.pInit;
      cvRouter.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
    this.uiContainer!.nativeElement.innerText = "";
    console.log('VideoCapture Component Unmount');
  }
}
