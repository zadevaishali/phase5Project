import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteFoodComponent } from '../admin/admin-foods/delete-food/delete-food.component';
import { Order } from '../model/order.model';
import { UserOrder } from '../model/user-order.model';
import { CartServices } from '../services/cart.service';
import { NotificationService } from '../services/notification/notification.service';
import { OrderService } from '../services/order.service';
import { UserOrderComponent } from './user-order/user-order.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  userOrders: UserOrder[] = [];
  faCircleInfo = faCircleInfo;
  faTrash = faTrash;
  shipping: number = 0;

  constructor(
    private orderService: OrderService,
    private cartService: CartServices,
    private dailog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.shipping = this.cartService.getShipping();
    this.orderService.getOrdersForUser().subscribe((response) => {
      this.orders = response;
      this.userOrders = this.orderService.convertOrdersToUserOrders(
        this.orders
      );
    });
  }

  onDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this order?',
    };
    this.dailog
      .open(DeleteFoodComponent, dialogConfig)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          let index = this.userOrders.findIndex((item) => item.id === id);
          if (index > -1) {
            this.userOrders.splice(index, 1);
          }
          this.orderService.deleteOrder(id).subscribe();
          this.notificationService.warn('Deleted successfully.');
        }
      });
  }

  showInvoice(id: number) {
    const dialogConfig = new MatDialogConfig();
    let order = this.userOrders.filter((order) => order.id === id);
    dialogConfig.data = {
      order: order,
    };
    dialogConfig.disableClose = true;
    this.dailog.open(UserOrderComponent, dialogConfig);
  }
}
