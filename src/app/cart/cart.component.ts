import { Component, OnInit } from '@angular/core';
import {
  faMinus,
  faPlus,
  faTrash,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../model/cart.model';
import { UserOrder } from '../model/user-order.model';
import { CartServices } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserOrderServices } from '../services/user-order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  userOrders: UserOrder[] = [];
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  faCircleCheck = faCircleCheck;
  subTotal: number = 0;
  shipping: number = 6;
  total: number = 0;
  disableMinus: boolean;
  constructor(
    private cartService: CartServices,
    private userOrderServices: UserOrderServices,
    private orderServices: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((response) => {
      response.forEach((cartItem) => {
        this.subTotal += cartItem.totalPrice;
        this.items.push(cartItem);
      });
      this.total = this.subTotal + this.shipping;
    });

    this.shipping = this.cartService.getShipping();
  }

  updateQuantityAndPrice(
    cartItem: CartItem,
    quantity: number,
    operation: string
  ) {
    let updatedItem = this.cartService.updateItemQuantityAndPrice(
      cartItem,
      quantity,
      operation
    );

    if (operation === 'plus') {
      this.subTotal += cartItem.price;
    } else {
      if (quantity > 0) {
        this.subTotal -= cartItem.price;
      }
      this.checkDisableStatus(quantity);
    }
    this.total = this.subTotal + this.shipping;
  }

  checkDisableStatus(quantity: number): boolean {
    return quantity > 0 ? this.disableMinus : !this.disableMinus;
  }

  onDelete(deletingItem: CartItem) {
    let index = this.items.findIndex((item) => item.id === deletingItem.id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.subTotal -= deletingItem.totalPrice;
    this.total = this.subTotal + this.shipping;
    this.cartService.deleteCartItem(deletingItem.id).subscribe();
  }

  onEditConfirm(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem).subscribe();
  }

  onPlaceOrder() {
    let userOrder = this.userOrderServices.createUserOrderFromCart(this.items);
    this.items.forEach((item) =>
      this.cartService.deleteCartItem(item.id).subscribe()
    );
    let order = this.orderServices.convertUserOrderToOrder(userOrder);
    this.orderServices.addOrder(order).subscribe();
    this.items = [];
    this.subTotal = 0;
    this.total = this.subTotal + this.shipping;
  }
}
