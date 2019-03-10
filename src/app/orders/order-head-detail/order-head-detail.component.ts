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
  newOrderItem: OrderItem;

  mainFoodItems: FoodItem[];
  selectedMainFoodItem: any;
  foodGroups: FoodGroup[];
  sideFoodGroups: FoodGroup[];
  selectedSides: FoodItem[] = [];
  selectedSidesMap: Map<any, FoodItem[]>;

  selectedOrderMenu: any;

  private idPack: number;

  constructor(
    private route: ActivatedRoute,
    private orderHeadService: OrderHeadService,
    private orderPackService: OrderPackService,
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idPack = +this.route.snapshot.paramMap.get('idPack');
    this.loadData();
    this.newOrderItem = new OrderItem();
    this.selectedSidesMap = new Map();
  }

  async loadData() {
    await this.getOrderPack();
    await this.getRestaurant();
    await this.getRestaurantMenu();
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
    this.restaurantService.getRestaurant(this.orderPack.restaurantId).subscribe(restaurant => this.restaurant = restaurant);
  }

  async getRestaurantMenu() {
    this.restaurantService.getRestaurantMenu(this.orderPack.restaurantId).subscribe(foodGroups => {
      if ((foodGroups != null) && (foodGroups.length > 0)) { this.foodGroups = foodGroups; this.setMainFoodItems(); }
    });
  }

  addOrderItem(): void {
    // menu 1 - database
    if (this.orderPack.menuSource === 1) {
      this.setOrderItemFromFoodItem()
    }
    // menu 3 - order
    if (this.orderPack.menuSource === 3) {
      if (this.selectedOrderMenu == null) {
        return;
      }
      this.newOrderItem.orderMenuId = this.selectedOrderMenu.id;
      this.newOrderItem.ownOrder = this.selectedOrderMenu.name;
      this.newOrderItem.amount = this.selectedOrderMenu.price;
    }
    // add to list
    if (this.orderItems) {
      this.orderItems.push(this.newOrderItem);
    } else {
      this.orderItems = [this.newOrderItem];
    }
    // clear new
    this.newOrderItem = new OrderItem();
  }

  removeOrder(orderItem: OrderItem): void {
    let index = this.orderItems.indexOf(orderItem);
    this.selectedSidesMap.delete(orderItem);
    this.orderItems.splice(index, 1);
  }

  getSides(orderItem: OrderItem): FoodItem[] {
    return this.selectedSidesMap.get(orderItem);
  }

  getTotal(): number {
    let total: number = 0;
    if (this.orderItems != null) {
      this.orderItems.forEach(item => {
        total += item.amount;
      });
    }
    return total;
  }

  onSubmit() {
    this.orderHeadService.putOrderHead(this.idPack, this.orderHead).subscribe(orderHead => {
      this.orderHead = orderHead;

      this.router.navigate(['/orderpacks', this.orderHead.orderPackId, 'order', this.orderHead.id]);
    }, (err) => { console.log(err); });
  }

  // food from restaurant database
  
  setMainFoodItems() {
    for (let group of this.foodGroups) {
      if (group.isMain) {
        for (let item of group.foodItems) {
          if (this.mainFoodItems) {
            this.mainFoodItems.push(item);
          } else {
            this.mainFoodItems = [item];
          }
        }
      }
    }
  }

  setOrderItemFromFoodItem(){
    if (this.selectedMainFoodItem == null) {
      return;
    }
    this.newOrderItem.foodItemId = this.selectedMainFoodItem.id;
    this.newOrderItem.ownOrder = this.selectedMainFoodItem.name;
    this.newOrderItem.amount = this.selectedMainFoodItem.price;
    if (this.selectedSides) {
      this.selectedSidesMap.set(this.newOrderItem, this.selectedSides);
      this.selectedSides =[];
    }
  }

  setSideFoodGroups(foodItem: any): boolean {
    if (foodItem == null) return false;
    for (let group of this.foodGroups) {
      if (group.id === foodItem.foodGroupId) {
        this.sideFoodGroups = group.sideFoodGroups;
        return true;
      }
    }
  }

}
