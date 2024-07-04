import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Component({
  standalone: true,
  selector: 'app-product-card',
  template: `
  <div class="product-card">
  <img [src]="product.src" alt="{{ product.name }}">
  <h3>{{ product.name }}</h3>
  <p>{{ product.description }}</p>
  <p>Price: {{ product.price }}</p>
  <button (click)="onAddToCart()">Add to Cart</button>
</div>
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