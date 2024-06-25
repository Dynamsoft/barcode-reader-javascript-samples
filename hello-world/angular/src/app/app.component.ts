import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgStyle, ImageCaptureComponent, VideoCaptureComponent],
})
export class AppComponent {
  title = 'dbrjs-angular-sample';

  mode: string = 'video';

  switchMode(value: string) {
    this.mode = value;
  }
}
