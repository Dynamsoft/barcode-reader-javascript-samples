import { Component } from '@angular/core';
import { CartBuilderComponent } from './cart-builder/cart-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CartBuilderComponent],
})
export class AppComponent {}
