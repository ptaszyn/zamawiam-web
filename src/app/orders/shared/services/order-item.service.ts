import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private orderItemsUrl = environment.baseUrl + '/orderpacks/idOrderPack/orderheads/idOrderHead/orderItems';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }
/*
  getOrderItems(idPack: number): Observable<OrderHead[]> {
    return this.http.get<OrderHead[]>(this.getPackUrl(idPack), this.options);
  }

  getOrderHead(idPack: number, id: number): Observable<OrderHead> {
    const url = `${this.getPackUrl(idPack)}/${id}`;
    return this.http.get<OrderHead>(url);
  }

  addOrderHead(idPack: number, orderHead: OrderHead): Observable<OrderHead> {
    return this.http.post<OrderHead>(this.getPackUrl(idPack), orderHead);
  }

  putOrderHead(idPack: number, orderHead: OrderHead): Observable<OrderHead> {
    const url = `${this.getPackUrl(idPack)}/${orderHead.id}`;
    return this.http.put<OrderHead>(url, orderHead);
  }

  getPackUrl(idPack: number): string {
    return this.orderItemsUrl.replace('idOrderPack',idPack.toString());
  }
  */
}
