import { Component } from '@angular/core';
import { EnumCapturedResultItemType, CaptureVisionRouter, type BarcodeResultItem } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
  standalone: true,
})
export class ImageCaptureComponent {
  constructor() {
    this.pCvRouter = CaptureVisionRouter.createInstance();
  }

  resultText = '';
  pCvRouter: Promise<CaptureVisionRouter>;

  captureImage = async (e: Event) => {
    let files = [...((e.target! as HTMLInputElement).files as any as File[])];
    (e.target! as HTMLInputElement).value = '';
    this.resultText = 'Decoding...';
    try {
      const cvRouter = await this.pCvRouter;

      let _resultText = '';
      for (let file of files) {
        const result = await cvRouter.capture(file, 'ReadBarcodes_ReadRateFirst');
        if (files.length > 1) {
          _resultText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          let item = _item as BarcodeResultItem;
          _resultText += `${item.formatString}: ${item.text}\n`;
        }
        if (!result.items.length) {
          _resultText += 'No barcode found\n';
        }
        this.resultText = _resultText;
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  ngOnDestroy() {
    this.pCvRouter?.then((cvRouter) => {
      cvRouter.dispose();
    });
  }
}
