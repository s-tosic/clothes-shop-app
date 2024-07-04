import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Product } from '../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  template: `<div>
  @for (product of products; track product.id) {
    <app-product-card [product]="product" (addToCart)="handleAddToCart(product)"></app-product-card>
  } @empty {
    <p>There are no products available.</p>
  }
</div>`,
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error(err)
    });
  }

  handleAddToCart(product: Product) {
    this.cartService.addToCart({ product, quantity: 1 });
    this.snackBar.open('added to cart!','ok');
  }
}