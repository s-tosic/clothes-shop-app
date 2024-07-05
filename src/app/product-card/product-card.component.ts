import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  template: `
  <mat-card class="product-card">
    <img mat-card-image [src]="product.src" alt="{{ product.name }}">
    <mat-card-title>{{ product.name }}</mat-card-title>
    <mat-card-content>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price}}</p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary" (click)="onAddToCart()">Add to Cart</button>
    </mat-card-actions>
  </mat-card>
  `,
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<CartItem>();

  onAddToCart() {
    console.log('clicked add to cart');
    this.addToCart.emit({
      product: this.product, 
      quantity: 1
    });
  }
}
