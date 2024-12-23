import { Component, ViewChild, ElementRef } from '@angular/core';
import '../dynamsoft.config';
import { EnumCapturedResultItemType } from 'dynamsoft-core';
import type { BarcodeResultItem } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
  standalone: true,
})
export class ImageCaptureComponent {
  resultText = "";

  pCvRouter?: Promise<CaptureVisionRouter>;
  isDestroyed = false;

  captureImage = async (e: Event) => {
    let files = [...((e.target! as HTMLInputElement).files as any as File[])];
    (e.target! as HTMLInputElement).value = ''; // reset input
    this.resultText = '';
    try {
      // ensure cvRouter is created only once
      const cvRouter = await (this.pCvRouter =
        this.pCvRouter || CaptureVisionRouter.createInstance());
      if (this.isDestroyed) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(file, 'ReadBarcodes_ReadRateFirst');
        console.log(result);
        if (this.isDestroyed) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          this.resultText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          this.resultText += item.text + '\n'; // output the decoded barcode text
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length)
          this.resultText +=
            'No barcode found\n';
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  };

  // dispose cvRouter when it's no longer needed
  async ngOnDestroy() {
    this.isDestroyed = true;
    if (this.pCvRouter) {
      try {
        (await this.pCvRouter).dispose();
      } catch (_) {}
    }
  }
}
