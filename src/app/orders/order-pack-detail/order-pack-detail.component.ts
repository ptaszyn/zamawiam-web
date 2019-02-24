import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';

@Component({
  selector: 'app-order-pack-detail',
  templateUrl: './order-pack-detail.component.html',
  styleUrls: ['./order-pack-detail.component.css']
})
export class OrderPackDetailComponent implements OnInit {

  @Input() orderPack: OrderPack = new OrderPack();
  urlNewOrder: string = window.location.href + '/order';

  constructor(
    private route: ActivatedRoute,
    private orderPackService: OrderPackService
  ) { }

  ngOnInit() {
    this.getOrderPack();
  }

  getOrderPack(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderPackService.getOrderPack(id).subscribe(orderPack => this.orderPack = orderPack);
  }

}
