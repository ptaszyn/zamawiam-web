import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';
import { OrderHeadService } from '../shared/services/order-head.service';
import { OrderHead } from '../shared/models/order-head';
import { Payment } from '../shared/models/payment';
import { OrderItem } from '../shared/models/order-item';

@Component({
  selector: 'app-order-pack-detail',
  templateUrl: './order-pack-detail.component.html',
  styleUrls: ['./order-pack-detail.component.css']
})
export class OrderPackDetailComponent implements OnInit {

  @Input() orderPack: OrderPack = new OrderPack();
  urlNewOrder: string = window.location.href + '/order';

  Payment = Payment;

  orderHeads: OrderHead[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderPackService: OrderPackService,
    private orderHeadService: OrderHeadService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  /*
  * load data
  */

  async loadData() {
    await this.getOrderPack();
    await this.getOrderHeads();
  }

  async getOrderPack() {
    const id = +this.route.snapshot.paramMap.get('id');
    const orderPack = await this.orderPackService.getOrderPack(id).toPromise();
    this.orderPack = orderPack;
  }

  async getOrderHeads() {
    const orderHeads = await this.orderHeadService.getOrderHeads(this.orderPack.id, 'false').toPromise();
    this.orderHeads = orderHeads;
  }

  copy(inputElement){
    inputElement.select();
    document.execCommand('copy');
 }

  setStatus(status: number) {
    this.orderPack.orderStatusId = status;
    this.orderPackService.putOrderPack(this.orderPack).subscribe(orderPack => this.orderPack = orderPack);
  }

  getOrderItemAmount(orderItem: OrderItem): string {
    return (orderItem.amount + this.sumOrderItems(orderItem.sideOrderItems)).toFixed(2);
  }

  getTotal(): string[] {
    let total: number = 0;
    let count: number = 0;
    if (this.orderHeads != null) {
      this.orderHeads.forEach(order => {
        total += this.sumOrderItems(order.orderItems);
        count += order.orderItems.length;
      });
    }
    return [total.toFixed(2), count.toString()];
  }

  private sumOrderItems(orderItems: OrderItem[]): number {
    let total: number = 0;
    if (orderItems != null) {
      orderItems.forEach(item => {
        total += (item.amount + this.sumOrderItems(item.sideOrderItems));
      });
    }
    return total;
  }

}
