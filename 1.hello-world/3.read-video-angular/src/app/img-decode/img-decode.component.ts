import { Component, OnInit } from '@angular/core';
import { BarcodeReader } from 'dynamsoft-javascript-barcode'

@Component({
  selector: 'app-img-decode',
  templateUrl: './img-decode.component.html',
  styleUrls: ['./img-decode.component.css']
})
export class ImgDecodeComponent implements OnInit {
  pReader = null;

  async ngOnInit(): Promise<void> { }

  decodeImg = async (e: any) => {
    try {
      const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      const results = await reader.decode(e.target.files[0]);
      for (const result of results) {
        alert(result.barcodeText);
      }
      if (!results.length) { alert('No barcode found'); }
    } catch (ex) {
      if (ex.message.indexOf("network connection error")) {
        let customMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        console.log(customMsg);
        alert(customMsg);
      }
      throw ex;
    }
    e.target.value = '';
  }

  async ngOnDestroy() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  }
}
