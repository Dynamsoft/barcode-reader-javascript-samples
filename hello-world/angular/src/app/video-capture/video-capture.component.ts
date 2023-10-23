import { Component, ElementRef, ViewChild } from '@angular/core';
import { BarcodeResultItem } from '@dynamsoft/dynamsoft-barcode-reader';
import {
  CameraEnhancer,
  CameraView,
} from '@dynamsoft/dynamsoft-camera-enhancer';
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from '@dynamsoft/dynamsoft-capture-vision-router';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
})
export class VideoCaptureComponent {
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> | null = null;

  @ViewChild('uiContainer') uiContainer: ElementRef<HTMLDivElement> | null =
    null;

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control.
      const cameraView = await CameraView.createInstance();
      console.log(1);
      
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      console.log(2);
      this.uiContainer!.nativeElement.append(cameraView.getUIElement());
      
      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const router = await CaptureVisionRouter.createInstance();
      console.log(3);
      router.setInput(cameraEnhancer);
      
      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onCapturedResultReceived = (result) => {
        for (let item of result.items) {
          console.log((item as BarcodeResultItem).text);
        }
      };
      router.addResultReceiver(resultReceiver);

      // Open camera and start scanning.
      await cameraEnhancer.open();
      console.log(4);
      
      await router.startCapturing('ReadSingleBarcode');
      console.log(5);
      return {
        cameraView,
        cameraEnhancer,
        router,
      };
    } catch (ex: any) {
      let errMsg;
      if (ex.message.includes('network connection error')) {
        errMsg =
          'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
      } else {
        errMsg = ex.message || ex;
      }
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
      console.log(6);
      
      const { cameraView, cameraEnhancer, router } = await this.pInit;
      router.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
      this.pInit = null;
      console.log('VideoCaptureComponent Unmount');
    }
  }
}
