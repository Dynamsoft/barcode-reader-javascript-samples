import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import DBR from 'dynamsoft-javascript-barcode'
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
})
export class BarcodeScannerComponent implements OnInit {
  bDestroyed = false;
  pScanner = null;
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  async ngOnInit(): Promise<void> {
    try {
      this.pScanner = this.pScanner || DBR.BarcodeScanner.createInstance();
      let scanner = await this.pScanner;

      if (this.bDestroyed) {
        scanner.destroy();
        return;
      }
       this.elementRef.nativeElement.appendChild(scanner.getUIElement());
       (<HTMLDivElement>document.getElementsByClassName("dce-btn-close")[0]).style.display = "none";
      scanner.onFrameRead = results => {
        for (let result of results) {
          this.appendMessage.emit({ format: result.barcodeFormatString, text: result.barcodeText, type: "result" });

          if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
            this.appendMessage.emit({ msg: result.exception.message, type: "error" });
          }
        }
      };
      await scanner.open();
    } catch (ex) {
      this.appendMessage.emit({ msg: ex.message, type: "error" });
      console.error(ex);
    }
  }
  async ngOnDestroy() {
    this.bDestroyed = true;
    if (this.pScanner) {
      (await this.pScanner).destroy();
    }
  }
}
