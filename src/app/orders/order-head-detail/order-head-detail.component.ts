import { Component, OnInit, Input } from '@angular/core';
import { OrderHead } from '../shared/models/order-head';
import { ActivatedRoute } from '@angular/router';
import { OrderHeadService } from '../shared/services/order-head.service';

@Component({
  selector: 'app-order-head-detail',
  templateUrl: './order-head-detail.component.html',
  styleUrls: ['./order-head-detail.component.css']
})
export class OrderHeadDetailComponent implements OnInit {

  @Input() orderHead: OrderHead = new OrderHead();

  private idPack: number;

  constructor(
    private route: ActivatedRoute,
    private orderHeadService: OrderHeadService
  ) { }

  ngOnInit() {
    this.idPack = +this.route.snapshot.paramMap.get('idPack');
    this.getOrderHead();
  }

  getOrderHead(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderHeadService.getOrderHead(this.idPack, id).subscribe(orderHead => this.orderHead = orderHead);
  }

  onSubmit(){
    this.orderHeadService.putOrderHead(this.idPack, this.orderHead).subscribe();
  }

}
