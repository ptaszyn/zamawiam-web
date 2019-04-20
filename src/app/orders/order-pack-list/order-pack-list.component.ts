import { Component, OnInit } from '@angular/core';

import { OrderPackService } from '../shared/services/order-pack.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPack } from '../shared/models/order-pack';
import { OrderHeadService } from '../shared/services/order-head.service';

@Component({
  selector: 'app-order-pack-list',
  templateUrl: './order-pack-list.component.html',
  styleUrls: ['./order-pack-list.component.css']
})
export class OrderPackListComponent implements OnInit {

  orderPacks: OrderPack[];
  isOwner: string;

  constructor(
    private orderPackService: OrderPackService,
    private orderHeadService: OrderHeadService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    /*this.activatedRoute.queryParams.subscribe(params => {
      this.isOwner = params['isOwner'];
    });*/
    if (this.router.url === '/orderpacks/my') {this.isOwner = 'true'; }
    this.orderPackService.getOrderPacks(this.isOwner).subscribe(orderPacks => this.orderPacks = orderPacks.slice().reverse());
  }

  goTo(orderPackId: number) {
    if (this.isOwner === 'true') {
      this.router.navigate(['/orderpacks/', orderPackId]);
    } else {
      this.goToOrderHead(orderPackId);
    }
  }

  async goToOrderHead(orderPackId: number) {
    const orderHeads = await this.orderHeadService.getOrderHeads(orderPackId, 'true').toPromise();
    if (orderHeads && (orderHeads.length > 0)) {
      this.router.navigate(['/orderpacks/' + orderPackId + '/order/' + orderHeads[0].id]);
    } else {
      this.router.navigate(['/orderpacks/' + orderPackId + '/order']);
    }
  }

}
