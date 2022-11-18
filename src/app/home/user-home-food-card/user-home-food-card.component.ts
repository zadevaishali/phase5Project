import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { CartItem } from 'src/app/model/cart.model';
import { Food } from 'src/app/model/food.model';
import { Order } from 'src/app/model/order.model';
import { UserOrder } from 'src/app/model/user-order.model';
import { CartServices } from 'src/app/services/cart.service';

import { FoodServices } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { UserOrderServices } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-user-home-food-card',
  templateUrl: './user-home-food-card.component.html',
  styleUrls: ['./user-home-food-card.component.css'],
})
export class UserHomeFoodCardComponent implements OnInit {
  foods: Food[] = [];
  orderedFoods: Food[] = [];
  cartItem: CartItem;
  cartItems: CartItem[] = [];
  order: Order;
  userOrder: UserOrder;
  shipping: number = 6;
  total: number = 0;
  sortDirection = 'asc';
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  
  constructor(
    private foodServices: FoodServices,
    private cartService: CartServices,
    private orderService: OrderService,
    private userOrderService: UserOrderServices
  ) {}

  ngOnInit(): void {
    this.foodServices.getFoodsForUser().subscribe((response) => {
      response.forEach((food) => this.foods.push(food));
    });
    this.cartService.getCartItems().subscribe((response) => {
      response.forEach((cartItem) => this.cartItems.push(cartItem));
    });
    this.shipping = this.cartService.getShipping();
  }

  onNavigateOrder(food: Food) {
    console.log(food);
    this.orderedFoods.push(food);
    this.cartItem = this.cartService.createCartItem(food);
    this.userOrder = this.userOrderService.createUserOrderFromHome(
      this.cartItem
    );
    console.log(this.userOrder);
    this.cartItems = [];
    this.order = this.orderService.convertUserOrderToOrder(this.userOrder);
    console.log(this.order);
    this.orderService.addOrder(this.order).subscribe();
  }

  addToCart(food: Food) {
    this.cartItem = this.cartService.createCartItem(food);
    let existingCartItem = this.cartItems.find(
      (cartItem) => cartItem.foodName === this.cartItem.foodName
    );

    if (existingCartItem) {
      this.cartItem = this.cartService.editCartItem(existingCartItem);
      this.cartService.updateCartItem(this.cartItem).subscribe();
    } else {
      this.cartService.addCartItem(this.cartItem).subscribe((response) => {
        this.cartItems.push(response);
      });
    }
  }

  onSortDirection() {
    console.log('button is pressed');
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }
}
