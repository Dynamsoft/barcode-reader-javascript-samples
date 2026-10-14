import { Component } from '@angular/core';
import { VideoOverlayComponent } from './video-overlay/video-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [VideoOverlayComponent],
})
export class AppComponent {}
