import { Component } from '@angular/core';
import { ImageCaptureComponent } from './image-capture/image-capture.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ImageCaptureComponent],
})
export class AppComponent {}
