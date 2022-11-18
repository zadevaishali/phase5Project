import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart.model';
import { Food } from '../model/food.model';
import { OrderedItem } from '../model/orderedItem.model';
import { UserOrder } from '../model/user-order.model';
import Util from '../utils/random-alphanumeric-string-generator';

@Injectable({ providedIn: 'root' })
export class UserOrderServices {
  private userOrder: UserOrder;
  private userOrders: UserOrder[] = [];
  private cartItems: CartItem[] = [];
  private orderedItems: OrderedItem[] = [];
  private totalPrice: number = 0;
  private status: string = Util.generateOrderStatus();

  createUserOrderFromCart(cartItems: CartItem[]): UserOrder {
    cartItems.forEach((cartItem) =>
      this.orderedItems.push(new OrderedItem(cartItem))
    );
    this.orderedItems.forEach(
      (orderedItem) =>
        (this.totalPrice += orderedItem.quantity * orderedItem.unitPrice)
    );
    this.userOrder = new UserOrder(
      0,
      this.orderedItems,
      this.totalPrice,
      this.status
    );
    this.orderedItems = [];
    this.totalPrice = 0;
    return this.userOrder;
  }

  createUserOrderFromHome(cartItem: CartItem): UserOrder {
    let orderedItem = new OrderedItem(cartItem);
    this.orderedItems.push(orderedItem);
    console.log(this.orderedItems);
    this.orderedItems.forEach(
      (orderedItem) =>
        (this.totalPrice += orderedItem.quantity * orderedItem.unitPrice)
    );

    this.userOrder = new UserOrder(
      orderedItem.id,
      this.orderedItems,
      this.totalPrice,
      this.status
    );
    console.log(this.userOrder);
    this.orderedItems = [];
    this.totalPrice = 0;
    return this.userOrder;
  }
}
