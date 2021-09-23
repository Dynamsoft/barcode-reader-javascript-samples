import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import DBR from '../dbr';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  resultItems = [];
  bShowScanner = false;
  resultValue = "";
  libLoaded = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  async ngOnInit(): Promise<void> {
    //Load the library on page load to speed things up.
    try {
      await DBR.BarcodeScanner.loadWasm();
      this.libLoaded = true;
      this.showScanner();
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  }
  showScanner(): void {
    this.bShowScanner = true;
  }
  hideScanner(): void {
    this.bShowScanner = false;
  }
  appendMessage(message) {
    switch (message.type) {
      case "result":
        this.resultValue = message.format + ": " + message.text;
        this.resultItems.push({ type: message.format + ": ", text: message.text });
        break;
      case "error":
        this.resultValue = message.msg;
        this.resultItems.push({ type: "Error: ", text: message.msg });
        break;
      default: break;
    }
  }
}
