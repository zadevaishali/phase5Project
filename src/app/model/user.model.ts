import { CartItem } from './cart.model';
//import { Order } from './order.model';

export interface User {
  id: number;
  username: string;
  emailId: string;
  mobileNumber: string;
  role: string;
  active: boolean;
  notLocked: boolean;
  cart: CartItem[];
  //orders: Order[];
}
