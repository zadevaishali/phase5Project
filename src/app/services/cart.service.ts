import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../model/cart.model';
import { Food } from '../model/food.model';
import { CustomHttpResponse } from '../model/http-response';

@Injectable({providedIn:'root'})
export class CartServices {

  private hostUrl = environment.apiUrl;
  private cartItem: CartItem;
  constructor(private http: HttpClient) {}


  private shipping: number = 6;
  
  totalQuantity:Subject<number>=new Subject<number>;
  totalPrice:Subject<number>=new Subject<number>;
  private subTotal:number=0;

  private cartItems: CartItem[] = [];

  public getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${this.hostUrl}` + '/cart')
  }

public addCartItem(newCartItem: CartItem): Observable<CartItem> {
  return this.http.post<CartItem>(
    `${this.hostUrl}` + '/cart',
      newCartItem
    );
  }

  public updateCartItem(updatedCartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${this.hostUrl}`+`/cart/${updatedCartItem.id}`,
      updatedCartItem
    );
  }

  public deleteCartItem(id: number): Observable<CustomHttpResponse> {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(
      `${this.hostUrl}`+`/cart/${id}`, 
    );
  }

  public createCartItem(food: Food): CartItem {
    this.cartItem = new CartItem(
      food.id,
      JSON.parse(localStorage.getItem('user')),
      food.name,
      1,
      food.price,
      food.price,
      food.imageUrl
    );
    return this.cartItem;
  }

  public editCartItem(cartItem: CartItem): CartItem {
    cartItem.id = cartItem.id;
    cartItem.foodName = cartItem.foodName;
    cartItem.user = cartItem.user;
    cartItem.quantity = cartItem.quantity + 1;
    cartItem.price = cartItem.price;
    cartItem.totalPrice = cartItem.quantity * cartItem.price;
    cartItem.imageUrl = cartItem.imageUrl;
    return cartItem;
  }


  getSubTotal() {
    return this.subTotal;
  }

  getShipping() {
    return this.shipping;
  }

  updateItemQuantityAndPrice(
    cartItem: CartItem,
    quantity: number,
    operation: string
  ) : CartItem {
    if (operation === 'plus') {
      cartItem.quantity = quantity; 
      cartItem.totalPrice += cartItem.price;
    } else if (operation === 'minus') {
      cartItem.quantity = quantity; 
      cartItem.totalPrice -= cartItem.price;
    }
    return cartItem;
  }


  clearCartItems() {
    this.cartItems = [];
    this.subTotal = 0;
    this.totalPrice.next(0);
  }

}
