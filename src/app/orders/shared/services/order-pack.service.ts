import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderPack } from '../models/order-pack';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderPackService {

  private orderPacksUrl = environment.baseUrl + '/orderpacks';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });


  //private params: HttpParams = new HttpParams();

  //private options = { headers: this.headers, params: this.params };

  constructor(private http: HttpClient) { }

  getOrderPacks(isOwner: string): Observable<OrderPack[]> {
    //this.options.params.set('is',type);
    //this.options.params.set('isOwner', isOwner);
    if (!isOwner) {isOwner = 'false'; }
    return this.http.get<OrderPack[]>(this.orderPacksUrl, {
      params: {
        isOwner: isOwner
      }
    });
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
