import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderHead } from '../models/order-head';

@Injectable({
  providedIn: 'root'
})
export class OrderHeadService {

  private orderHeadsUrl = 'http://localhost:8080/api/orderpacks/idOrderPack/orderheads';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getOrderHeads(idPack: number): Observable<OrderHead[]> {
    return this.http.get<OrderHead[]>(this.orderHeadsUrl.replace('idOrderPack',idPack.toString()), this.options);
  }

  getOrderHead(idPack: number, id: number): Observable<OrderHead> {
    const url = `${this.orderHeadsUrl.replace('idOrderPack',idPack.toString())}/${id}`;
    return this.http.get<OrderHead>(url);
  }

  addOrderHead(idPack: number, orderHead: OrderHead): Observable<OrderHead> {
    return this.http.post<OrderHead>(this.orderHeadsUrl.replace('idOrderPack',idPack.toString()), orderHead);
  }

  putOrderHead(idPack: number, orderHead: OrderHead): Observable<OrderHead> {
    const url = `${this.orderHeadsUrl.replace('idOrderPack',idPack.toString())}/${orderHead.id}`;
    return this.http.put<OrderHead>(url, orderHead);
  }
}
