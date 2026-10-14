import { Component } from '@angular/core';
import { BatchInventoryComponent } from './batch-inventory/batch-inventory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [BatchInventoryComponent],
})
export class AppComponent {}
