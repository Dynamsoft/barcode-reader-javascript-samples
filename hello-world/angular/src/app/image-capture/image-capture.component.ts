import { Component } from '@angular/core';
import { BarcodeResultItem } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
})
export class ImageCaptureComponent {
  pInit: Promise<CaptureVisionRouter> | null = null;

  decodeImg = async (e: any) => {
    try {
      const router = await this.pInit;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router!.capture(
        e.target.files[0],
        'ReadBarcodes_SpeedFirst'
      );
      let texts = '';
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + '\n';
      }
      if (texts != '') alert(texts);
      if (!result.items.length) alert('No barcode found');
    } catch (ex: any) {
      let errMsg;
      if (ex.message?.includes('network connection error')) {
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

  async ngOnInit(): Promise<void> {
    this.pInit = CaptureVisionRouter.createInstance();
  }

  async ngOnDestroy() {
    if (this.pInit) {
      const router = await this.pInit;
      router.dispose();
    }
    console.log('ImageCapture Component Unmount');
  }
}
