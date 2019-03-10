import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderHead } from '../models/order-head';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHeadService {

  private orderHeadsUrl = environment.baseUrl + '/orderpacks/idOrderPack/orderheads';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getOrderHeads(idPack: number): Observable<OrderHead[]> {
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
    return this.orderHeadsUrl.replace('idOrderPack',idPack.toString());
  }
}
