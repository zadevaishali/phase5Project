import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderedItem } from 'src/app/model/orderedItem.model';
import { UserOrder } from 'src/app/model/user-order.model';
import { User } from 'src/app/model/user.model';
import { CartServices } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
})
export class UserOrderComponent implements OnInit {
  order: UserOrder;
  orderedItems: OrderedItem[];
  user: User;
  grandTotal: number;
  shipping: number;
  constructor(
    private cartService: CartServices,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UserOrderComponent>
  ) {}

  ngOnInit(): void {
    this.order = this.data.order[0];
    this.orderedItems = this.order.orderedItems;
    this.shipping = this.cartService.getShipping();
    this.grandTotal = this.shipping + this.order.totalPrice;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onClose() {
    this.dialogRef.close();
  }
}
