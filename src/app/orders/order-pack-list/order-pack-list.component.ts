import { Component, OnInit } from '@angular/core';

import { OrderPackService } from '../shared/services/order-pack.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPack } from '../shared/models/order-pack';

@Component({
  selector: 'app-order-pack-list',
  templateUrl: './order-pack-list.component.html',
  styleUrls: ['./order-pack-list.component.css']
})
export class OrderPackListComponent implements OnInit {

  orderPacks: OrderPack[];
  is: string;

  constructor(
    private orderPackService: OrderPackService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.is = params['is'];
    });
    this.orderPackService.getOrderPacks(this.is).subscribe(orderPacks => this.orderPacks = orderPacks.slice().reverse());
  }

  goTo(id: number){
    if(this.is === 'my'){
      this.router.navigate(['/orderpacks/', id]);
    } else {
      this.router.navigate(['/orderpacks/' + id + '/order']);
    }
  }

}
