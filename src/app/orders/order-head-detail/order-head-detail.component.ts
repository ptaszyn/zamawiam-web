import { Component, OnInit, Input } from '@angular/core';
import { OrderHead } from '../shared/models/order-head';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHeadService } from '../shared/services/order-head.service';
import { RestaurantService } from 'src/app/restaurants/shared/services/restaurant.service';
import { Restaurant } from 'src/app/restaurants/shared/models/restaurant';
import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';
import { OrderItem } from '../shared/models/order-item';
import { FoodGroup } from 'src/app/restaurants/shared/models/food-group';
import { FoodItem } from 'src/app/restaurants/shared/models/food-item';
import { OrderMenu } from '../shared/models/order-menu';
import { Payment } from '../shared/models/payment';

@Component({
  selector: 'app-order-head-detail',
  templateUrl: './order-head-detail.component.html',
  styleUrls: ['./order-head-detail.component.css']
})
export class OrderHeadDetailComponent implements OnInit {

  @Input() orderHead: OrderHead = new OrderHead();
  orderPack: OrderPack = new OrderPack();
  restaurant: Restaurant = new Restaurant();

  private Payment = Payment;
  payments: any;

  newOrderItem: OrderItem;

  selectedMainFoodItem: any;
  selectedOrderMenu: any;

  foodGroups: FoodGroup[];
  mainFoodItems: FoodItem[];
  sideFoodGroups: FoodGroup[];

  selectedSides: FoodItem[] = [];

  idPack: number;

  //validation
  vPay = true;

  constructor(
    private route: ActivatedRoute,
    private orderHeadService: OrderHeadService,
    private orderPackService: OrderPackService,
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idPack = +this.route.snapshot.paramMap.get('idPack');
    this.payments = Object.keys(Payment);
    this.newOrderItem = new OrderItem();
    this.loadData();
  }

  /*
  * load data
  */ 

  async loadData() {
    this.getOrderHead();
    await this.getOrderPack();
    await this.getRestaurant();
    await this.getRestaurantMenu();
  }

  getOrderHead(): void {
    const idHead = this.route.snapshot.paramMap.get('id');
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
    this.restaurantService.getRestaurant(this.orderPack.restaurantId).subscribe(restaurant => this.restaurant = restaurant);
  }

  async getRestaurantMenu() {
    this.restaurantService.getRestaurantMenu(this.orderPack.restaurantId).subscribe(foodGroups => {
      if ((foodGroups != null) && (foodGroups.length > 0)) { this.foodGroups = foodGroups; this.setMainFoodItems(); }
    });
  }

  /*
  * add new order
  */ 

  addOrderItem(): void {
    // menu 1 - database
    if (this.orderPack.menuSource === 1) {
      this.newOrderItem = this.convertFoodItemToOrderItem(this.selectedMainFoodItem);
      if (this.selectedSides) {
        for (const side of this.selectedSides) {
          if (this.newOrderItem.sideOrderItems) {
            this.newOrderItem.sideOrderItems.push(this.convertFoodItemToOrderItem(side));
          } else {
            this.newOrderItem.sideOrderItems = [this.convertFoodItemToOrderItem(side)];
          }
        }
        this.selectedSides = [];
      }
    }
    // menu 3 - order
    if (this.orderPack.menuSource === 3) {
      this.newOrderItem = this.convertOrderMenuToOrderItem(this.selectedOrderMenu);
    }
    // add to order list
    if (this.orderHead.orderItems) {
      this.orderHead.orderItems.push(this.newOrderItem);
    } else {
      this.orderHead.orderItems = [this.newOrderItem];
    }
    // clear add form
    this.newOrderItem = new OrderItem();
  }

  private convertFoodItemToOrderItem(foodItem: FoodItem): OrderItem {
    if (foodItem == null) {
      return;
    }
    const orderItem: OrderItem = new OrderItem();
    orderItem.foodItemId = foodItem.id;
    orderItem.ownOrder = foodItem.name;
    orderItem.amount = foodItem.price;
    return orderItem;
  }

  private convertOrderMenuToOrderItem(orderMenu: OrderMenu): OrderItem {
    if (orderMenu == null) {
      return;
    }
    const orderItem: OrderItem = new OrderItem();
    orderItem.orderMenuId = orderMenu.id;
    orderItem.ownOrder = orderMenu.name;
    orderItem.amount = orderMenu.price;
    return orderItem;
  }

  /*
  * remove order
  */ 

  removeOrder(orderItem: OrderItem): void {
    const index = this.orderHead.orderItems.indexOf(orderItem);
    this.orderHead.orderItems.splice(index, 1);
  }

  /*
  * view
  */ 

  getSides(orderItem: OrderItem): OrderItem[] {
    const index = this.orderHead.orderItems.indexOf(orderItem);
    return this.orderHead.orderItems[index].sideOrderItems;
  }

  getTotal(): string {
    let total: number = 0;
    if (this.orderHead.orderItems != null) {
      this.orderHead.orderItems.forEach(item => {
        total += item.amount;
      });
    }
    return total.toFixed(2);
  }

  /*
  * validation
  */
  validate(): boolean {
    this.vPay = false;
    if (this.orderHead.payment) {this.vPay = true; }
    return this.vPay;
  }

  /*
  * send orders
  */ 

  onSubmit() {
    if(!this.validate()) {return; }
    this.orderHead.amount = +this.getTotal();
    this.orderHeadService.addOrderHead(this.idPack, this.orderHead).subscribe(orderHead => {
      this.orderHead = orderHead;
      this.router.navigate(['/orderpacks', this.orderHead.orderPackId, 'order', this.orderHead.id]);
    }, (err) => { console.log(err); });
  }

  /*
  * food from restaurant database
  */ 

  setMainFoodItems() {
    for (const group of this.foodGroups) {
      if (group.isMain) {
        for (const item of group.foodItems) {
          if (this.mainFoodItems) {
            this.mainFoodItems.push(item);
          } else {
            this.mainFoodItems = [item];
          }
        }
      }
    }
  }

  setSideFoodGroups(foodItem: any): boolean {
    if (foodItem == null) {return false;}
    for (const group of this.foodGroups) {
      if (group.id === foodItem.foodGroupId) {
        this.sideFoodGroups = group.sideFoodGroups;
        return true;
      }
    }
  }

}
