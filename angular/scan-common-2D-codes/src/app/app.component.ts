import { Component } from '@angular/core';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [BarcodeScannerComponent],
})
export class AppComponent {}
