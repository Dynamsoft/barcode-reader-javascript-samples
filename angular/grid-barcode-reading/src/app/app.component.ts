import { Component } from '@angular/core';
import { GridReaderComponent } from './grid-reader/grid-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [GridReaderComponent],
})
export class AppComponent {}
