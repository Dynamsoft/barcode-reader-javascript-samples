import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import DBR from 'dynamsoft-javascript-barcode'
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit {
  bDestroyed = false;
  scanner = null;
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  async ngOnInit(): Promise<void> {
    try {
      this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();

      if (this.bDestroyed) {
        this.scanner.destroy();
        return;
      }
      this.scanner.setUIElement(this.elementRef.nativeElement);
      this.scanner.onFrameRead = results => {
        for (let result of results) {
          this.appendMessage.emit(result.barcodeFormatString + ': ' + result.barcodeText);
        }
      };
      await this.scanner.open();
    } catch (ex) {
      this.appendMessage.emit(ex.message);
      console.error(ex);
    }
  }
  ngOnDestroy() {
    this.bDestroyed = true;
    if (this.scanner) {
      this.scanner.destroy();
    }
  }
}
