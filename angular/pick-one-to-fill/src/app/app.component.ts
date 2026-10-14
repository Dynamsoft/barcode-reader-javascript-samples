import { Component } from '@angular/core';
import { PickFillComponent } from './pick-fill/pick-fill.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PickFillComponent],
})
export class AppComponent {}
