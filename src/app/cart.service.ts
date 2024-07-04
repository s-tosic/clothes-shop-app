import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  currentCart = this.cart.asObservable();

  constructor() { }

  addToCart(item: CartItem): void {
    let currentItems = this.cart.value;
    const existingItem = currentItems.find(ci => ci.product.id === item.product.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    this.cart.next(currentItems);
  }

  removeFromCart(productId: number): void {
    let currentItems = this.cart.value.filter(item => item.product.id !== productId);
    this.cart.next(currentItems);
  }

  clearCart(): void {
    this.cart.next([]);
  }
}