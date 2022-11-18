import { OrderedItem } from './orderedItem.model';

export class UserOrder {
  id: number;
  orderedItems: OrderedItem[] = [];
  totalPrice: number;
  status: string;

  constructor(
    id: number,
    orderItems: OrderedItem[],
    orderItemTotalPrice: number,
    status: string
  ) {
    this.orderedItems = orderItems;
    this.totalPrice = orderItemTotalPrice;
    this.status = status;
    this.id = id;
  }
}
