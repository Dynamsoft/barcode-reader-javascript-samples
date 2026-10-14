import { Component } from '@angular/core';
import { SingleBarcodeComponent } from './single-barcode/single-barcode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SingleBarcodeComponent],
})
export class AppComponent {}
