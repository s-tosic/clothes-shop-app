import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-orders.component.html',
})
export class CompletedOrdersComponent implements OnInit {
  completedOrders: CartItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadCompletedOrders();
  }

  loadCompletedOrders() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('user', user);
    this.completedOrders = user.cart || []; 
  }

  onRate(product: any, rating: number) {
    console.log(`Rated ${product.name} with ${rating} stars.`);
  }
}
