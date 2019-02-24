import { Component, OnInit, Input } from '@angular/core';
import { OrderHead } from '../shared/models/order-head';
import { ActivatedRoute } from '@angular/router';
import { OrderHeadService } from '../shared/services/order-head.service';
import { RestaurantService } from 'src/app/restaurants/shared/services/restaurant.service';
import { Restaurant } from 'src/app/restaurants/shared/models/restaurant';
import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';
import { OrderItem } from '../shared/models/order-item';

@Component({
  selector: 'app-order-head-detail',
  templateUrl: './order-head-detail.component.html',
  styleUrls: ['./order-head-detail.component.css']
})
export class OrderHeadDetailComponent implements OnInit {

  @Input() orderHead: OrderHead = new OrderHead();
  orderPack: OrderPack = new OrderPack();
  restaurant: Restaurant = new Restaurant();
  orderItems: OrderItem[];

  private idPack: number;

  constructor(
    private route: ActivatedRoute,
    private orderHeadService: OrderHeadService,
    private orderPackService: OrderPackService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.idPack = +this.route.snapshot.paramMap.get('idPack');
    this.getOrderHead();
    this.getRestaurant();
    this.addOrderItem();
  }

  getOrderHead(): void {
    let idHead = this.route.snapshot.paramMap.get('id');
    if (idHead) {
      const id = +idHead;
      this.orderHeadService.getOrderHead(this.idPack, id).subscribe(orderHead => this.orderHead = orderHead);
    } else {
      this.orderHead.orderPackId = this.idPack;
    }
  }

  async getOrderPack() {
    const orderPack = await this.orderPackService.getOrderPack(this.idPack).toPromise();
    this.orderPack = orderPack;
  }

  async getRestaurant() {
    await this.getOrderPack();
    this.restaurantService.getRestaurant(this.orderPack.restaurantId).subscribe(restaurant => this.restaurant = restaurant);
  }

  addOrderItem(): void {
    if(this.orderItems){
      this.orderItems.push(new OrderItem());
    } else {
      this.orderItems = [new OrderItem];
    }
  }

  removeOrderItem(orderItem: OrderItem): void {
    let index = this.orderItems.indexOf(orderItem);
    this.orderItems.splice(index,1);
  }

  getTotal(): number {
    let total: number = 0;
    this.orderItems.forEach(item => {
      total += item.amount;
    });
    return total;
  }

  onSubmit() {
    this.orderHeadService.putOrderHead(this.idPack, this.orderHead).subscribe();
  }

}
