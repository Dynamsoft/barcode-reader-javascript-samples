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
    await DBR.BarcodeScanner.loadWasm();
    this.libLoaded = true;
  }
  showScanner(): void {
    this.bShowScanner = true;
  }
  appendMessage(str: string) {
    console.log(str);
    this.resultValue = str;
  }
}
