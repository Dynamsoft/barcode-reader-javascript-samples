import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';
@Component({
  selector: 'app-video-decode',
  templateUrl: './video-decode.component.html',
  styleUrls: ['./video-decode.component.css'],
})
export class VideoDecodeComponent implements OnInit {
  pScanner: Promise<BarcodeScanner> | null = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      await scanner.setUIElement(
        (document.querySelector('.dce-video-container') as HTMLElement).parentElement as HTMLElement
      );
      scanner.onFrameRead = (results: any) => {
        for (const result of results) {
          console.log(result.barcodeText);
        }
      };
      scanner.onUniqueRead = (txt, result) => {
        alert(txt);
      };
      await scanner.open();
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
  }
  async ngOnDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log('BarcodeScanner Component Unmount');
    }
  }
}