import { Component } from '@angular/core';
import { EnumCapturedResultItemType, CaptureVisionRouter, type BarcodeResultItem } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-grid-reader',
  templateUrl: './grid-reader.component.html',
  styleUrls: ['./grid-reader.component.css'],
  standalone: true,
})
export class GridReaderComponent {
  constructor() {
    this.pCvRouter = CaptureVisionRouter.createInstance();
  }

  resultText = '';
  status = '';
  pCvRouter: Promise<CaptureVisionRouter>;

  processImage = async (e: Event) => {
    const file = ((e.target! as HTMLInputElement).files as any as File[])?.[0];
    if (!file) return;
    (e.target! as HTMLInputElement).value = '';
    this.status = 'Phase 1: Fast scan...';
    this.resultText = '';

    try {
      const cvRouter = await this.pCvRouter;

      // Phase 1: Fast scan
      await cvRouter.initSettings("./assets/GridFastScan.json");
      const fastResult = await cvRouter.capture(file, 'GridFastScan');
      const barcodes = fastResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      this.status = `Phase 1 found ${barcodes.length} barcodes. Running deep decode...`;

      // Phase 2: Deep decode
      await cvRouter.initSettings("./assets/GridDeepDecode.json");
      const deepResult = await cvRouter.capture(file, 'GridDeepDecode');
      const deepBarcodes = deepResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      const allBarcodes = deepBarcodes.length > barcodes.length ? deepBarcodes : barcodes;

      let text = `Total barcodes found: ${allBarcodes.length}\n\n`;
      allBarcodes.forEach((item, i) => {
        text += `[${i + 1}] ${item.formatString}: ${item.text}\n`;
      });

      this.resultText = text;
      this.status = `Done! Found ${allBarcodes.length} barcodes.`;
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
      this.status = 'Error';
    }
  };

  ngOnDestroy() {
    this.pCvRouter?.then((r) => r.dispose());
  }
}
