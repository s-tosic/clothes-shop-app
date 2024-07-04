import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart-item';


@Component({
  standalone: true,
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class CheckoutConfirmationComponent implements OnInit {
  total = 0;

  constructor(
    public dialogRef: MatDialogRef<CheckoutConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: CartItem[] }
  ) {}

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.data.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
