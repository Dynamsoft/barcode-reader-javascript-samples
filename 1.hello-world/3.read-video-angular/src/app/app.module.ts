import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ImgDecodeComponent } from './img-decode/img-decode.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    BarcodeScannerComponent,
    ImgDecodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
