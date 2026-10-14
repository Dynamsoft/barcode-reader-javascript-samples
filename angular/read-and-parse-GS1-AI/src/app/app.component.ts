import { Component } from '@angular/core';
import { GS1ScannerComponent } from './gs1-scanner/gs1-scanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [GS1ScannerComponent],
})
export class AppComponent {}
