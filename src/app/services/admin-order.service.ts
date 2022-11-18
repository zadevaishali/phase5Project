import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOrder } from '../model/admin-order.model';
import { UserOrder } from '../model/user-order.model';

@Injectable({ providedIn: 'root' })
export class AdminOrderServices {
  private hostUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getOrdersForAdmin(): Observable<AdminOrder[]> {
    return this.http.get<AdminOrder[]>(`${this.hostUrl}` + '/admin/orders');
  }

  createAdminOrder(userOrder: UserOrder) {}
}
