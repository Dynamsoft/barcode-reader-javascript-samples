import { Component } from '@angular/core';
import { ParseScannerComponent } from './parse-scanner/parse-scanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ParseScannerComponent],
})
export class AppComponent {}
