import { CartItem } from './cart-item';

export interface User {
  id: number
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  password?: string;
  cart: CartItem[];
}