import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';
import { OrderHeadService } from '../shared/services/order-head.service';
import { OrderHead } from '../shared/models/order-head';

@Component({
  selector: 'app-order-pack-detail',
  templateUrl: './order-pack-detail.component.html',
  styleUrls: ['./order-pack-detail.component.css']
})
export class OrderPackDetailComponent implements OnInit {

  @Input() orderPack: OrderPack = new OrderPack();
  urlNewOrder: string = window.location.href + '/order';

  orderHeads: OrderHead[];

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
    const orderHeads = await this.orderHeadService.getOrderHeads(this.orderPack.id).toPromise();
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

}
