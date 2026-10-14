import { Component } from '@angular/core';
import { TipBeepComponent } from './tip-beep/tip-beep.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TipBeepComponent],
})
export class AppComponent {}
