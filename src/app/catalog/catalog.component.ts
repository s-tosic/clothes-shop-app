import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Product } from '../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [ProductCardComponent, MatGridListModule, MatCardModule, CommonModule],
  template: `
    <div class="catalog-container">
      <mat-grid-list cols="5" rowHeight="550px" gutterSize="16px">
        <mat-grid-tile *ngFor="let product of products">
          <app-product-card [product]="product" (addToCart)="handleAddToCart(product)"></app-product-card>
        </mat-grid-tile>
      </mat-grid-list>
      <p *ngIf="products.length === 0">There are no products available.</p>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 16px;
    }
  `]
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
    this.snackBar.open('Added to cart!', 'OK');
  }
}
