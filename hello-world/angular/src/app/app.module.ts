import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCaptureComponent,
    VideoCaptureComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
