import { CartItem } from './cart.model';

export class OrderedItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;

  constructor(cartItem: CartItem) {
    this.id = cartItem.id;
    this.name = cartItem.foodName;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.price;
    this.subtotal = cartItem.quantity * cartItem.price;
  }
}
