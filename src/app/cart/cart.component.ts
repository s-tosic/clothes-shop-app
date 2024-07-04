import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item';
import { CheckoutConfirmationComponent } from '../checkout-confirmation/checkout-confirmation.component'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, public dialog: MatDialog) {}  

  ngOnInit() {
    this.cartService.currentCart.subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error(err)
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  openCheckoutDialog() {
    const dialogRef = this.dialog.open(CheckoutConfirmationComponent, {
      width: '600px',
      data: { cartItems: this.cartItems }  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Checkout confirmed');

      } else {
        console.log('Checkout cancelled');
      }
    });
  }
}