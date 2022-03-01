import { Component, OnInit } from '@angular/core';
import DBR from '../dbr';

@Component({
  selector: 'app-img-decode',
  templateUrl: './img-decode.component.html',
  styleUrls: ['./img-decode.component.css']
})
export class ImgDecodeComponent implements OnInit {
  pReader = null;

  async ngOnInit(): Promise<void> {}

  decodeImg = async (e: any) => {
    try {
      const reader = await (this.pReader = DBR.BarcodeReader.createInstance());
      const results = await reader.decode(e.target.files[0]);
      for (const result of results) {
        alert(result.barcodeText);
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async ngOnDestroy() {
    if (this.pReader) {
      (await this.pReader).destroy();
      console.log('ImgDecode Component Unmount');
    }
  }
}
