import { Component } from '@angular/core';
import { EnumCapturedResultItemType, CaptureVisionRouter } from 'dynamsoft-barcode-reader-bundle';
import type { BarcodeResultItem } from 'dynamsoft-barcode-reader-bundle';

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

  resultText = "";
  pCvRouter: Promise<CaptureVisionRouter>;

  captureImage = async (e: Event) => {
    let files = [...((e.target! as HTMLInputElement).files as any as File[])];
    (e.target! as HTMLInputElement).value = ''; // reset input
    this.resultText = 'decoding...';
    try {
      // ensure cvRouter is created only once
      const cvRouter = await this.pCvRouter;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(file, 'ReadBarcodes_ReadRateFirst');
        console.log(result);

        this.resultText = "";
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
        if (!result.items.length) {
          this.resultText += 'No barcode found\n';
        }
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  // dispose cvRouter when it's no longer needed
  ngOnDestroy() {
    console.log("image capture component disposed");
    // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
    this.pCvRouter?.then((cvRouter) => {
      cvRouter.dispose();
    });
  }
}
