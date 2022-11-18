import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminOrder } from 'src/app/model/admin-order.model';
import { OrderedItem } from 'src/app/model/orderedItem.model';
import { CartServices } from 'src/app/services/cart.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  order: AdminOrder = null;
  orderedItems: OrderedItem[] = [];
  grandTotal: number;
  shipping: number;
  constructor(
    private cartService: CartServices,

    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AdminOrderComponent>
  ) {}

  ngOnInit(): void {
    this.order = this.data.order[0];
    this.orderedItems = this.order.orderedItems;
    this.shipping = this.cartService.getShipping();
    this.grandTotal = this.shipping + this.order.totalPrice;
  }

  onClose() {
    this.dialogRef.close();
  }
}
