import { Component } from '@angular/core';
import { BarcodeResultItem } from '@dynamsoft/dynamsoft-barcode-reader';
import { CaptureVisionRouter } from '@dynamsoft/dynamsoft-capture-vision-router';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
})
export class ImageCaptureComponent {
  promise: Promise<CaptureVisionRouter> | null = null;

  async ngOnInit(): Promise<void> {
    this.promise = CaptureVisionRouter.createInstance();
  }

  decodeImg = async (e: any) => {
    try {
      const router = await this.promise;
      const result = await router!.capture(
        e.target.files[0],
        'ReadBarcodes_SpeedFirst'
      );
      for (let item of result.items) {
        alert((item as BarcodeResultItem).text);
      }
      if (!result.items.length) {
        alert('No barcode found');
      }
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
    }
    e.target.value = '';
  };

  async ngOnDestroy() {
    if (this.promise) {
      (await this.promise).dispose();
      this.promise = null;
      console.log('ImageCaptureComponent Unmount');
    }
  }
}
