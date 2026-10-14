import { Component } from '@angular/core';
import { ScanSearchComponent } from './scan-search/scan-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ScanSearchComponent],
})
export class AppComponent {}
