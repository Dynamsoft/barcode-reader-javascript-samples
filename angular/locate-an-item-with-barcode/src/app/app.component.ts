import { Component } from '@angular/core';
import { LocateItemComponent } from './locate-item/locate-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [LocateItemComponent],
})
export class AppComponent {}
