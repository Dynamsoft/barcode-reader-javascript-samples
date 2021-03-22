import { Component, OnInit } from '@angular/core';
import DBR from '../dbr';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  bShowScanner = false;
  resultValue = "";
  libLoaded = false;
  constructor() { }

  async ngOnInit(): Promise<void> {
    //Load the library on page load to speed things up.
    try {
      //DBR.BarcodeReader._bUseFullFeature = true;
      await DBR.BarcodeScanner.loadWasm();
      this.libLoaded = true;
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  }
  showScanner(): void {
    this.bShowScanner = true;
  }
  appendMessage(str: string) {
    console.log(str);
    this.resultValue = str;
  }
}
