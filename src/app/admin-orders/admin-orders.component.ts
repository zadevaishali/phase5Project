import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { AdminOrder } from '../model/admin-order.model';
import { Order } from '../model/order.model';
import { CartServices } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AdminOrderComponent } from './admin-order/admin-order.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  adminOrders: AdminOrder[] = [];
  shipping: number = 0;
  faCircleInfo = faCircleInfo;

  constructor(
    private orderService: OrderService,
    private cartService: CartServices,
    private dailog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shipping = this.cartService.getShipping();
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForAdmin().subscribe((response) => {
      this.orders = response;
      this.adminOrders = this.orderService.convertOrdersToAdminOrders(
        this.orders
      );
    });
  }

  showInvoice(id: number) {
    const dialogConfig = new MatDialogConfig();
    let order = this.adminOrders.filter((order) => order.orderId === id);
    dialogConfig.data = {
      order: order,
    };
    dialogConfig.disableClose = true;
    this.dailog.open(AdminOrderComponent, dialogConfig);
  }
}
