import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderPack } from '../models/order-pack';

@Injectable({
  providedIn: 'root'
})
export class OrderPackService {

  private orderPacksUrl = 'http://localhost:8080/api/orderpacks';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getOrderPacks(): Observable<OrderPack[]> {
    return this.http.get<OrderPack[]>(this.orderPacksUrl, this.options);
  }

  getOrderPack(id: number): Observable<OrderPack> {
    const url = `${this.orderPacksUrl}/${id}`;
    return this.http.get<OrderPack>(url);
  }

  addOrderPack(orderPack: OrderPack): Observable<OrderPack> {
    return this.http.post<OrderPack>(this.orderPacksUrl, orderPack);
  }

  putOrderPack(orderPack: OrderPack): Observable<OrderPack> {
    const url = `${this.orderPacksUrl}/${orderPack.id}`;
    return this.http.put<OrderPack>(url, orderPack);
  }
}
