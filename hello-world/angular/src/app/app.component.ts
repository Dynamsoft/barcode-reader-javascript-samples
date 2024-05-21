import { Component } from '@angular/core';

import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ImageCaptureComponent, VideoCaptureComponent]
})
export class AppComponent {
  title = 'dbrjs-sample-angular';
}
