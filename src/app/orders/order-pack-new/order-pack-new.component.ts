import { Component, OnInit } from '@angular/core';

import { Restaurant } from 'src/app/restaurants/shared/models/restaurant';
import { RestaurantService } from 'src/app/restaurants/shared/services/restaurant.service';
import { OrderMenu } from '../shared/models/order-menu';
import { OrderPack } from '../shared/models/order-pack';
import { OrderPackService } from '../shared/services/order-pack.service';
import { of } from 'rxjs'
import { Observable } from 'rxjs';
import { restoreView } from '@angular/core/src/render3';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-pack-new',
  templateUrl: './order-pack-new.component.html',
  styleUrls: ['./order-pack-new.component.css']
})
export class OrderPackNewComponent implements OnInit {

  currentTab: number = 0;

  restaurants: Restaurant[];
  restaurant: Restaurant;

  orderMenus: OrderMenu[];
  formOrderMenu: OrderMenu = new OrderMenu();

  orderPack: OrderPack = new OrderPack();

  //validation
  vName = true;
  vUrl = true;
  vMenu = true;
  vPrice = true;

  constructor(
    private restaurantService: RestaurantService,
    private orderPackService: OrderPackService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setNewRestaurant();
    this.getRestaurants();
    this.setFirstMenu();
  }

  validateInput(): boolean {
    let tab = this.currentTab;
    if (tab === 0) {
      return this.validateRestaurant();
    } else if (tab === 1) {
      if (this.orderPack.menuSource === 2) return this.validateMenuUrl();
      else if (this.orderPack.menuSource === 3) return this.validateMenuOrder();
    } else {
      return true;
    }
  }

  // Restaurant

  setNewRestaurant(): void {
    this.restaurant = new Restaurant();
    this.restaurants = [this.restaurant];
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = this.restaurants.concat(restaurants)
    });
  }

  setRestaurant(restaurant: Restaurant): void {
    this.restaurant = restaurant;
  }

  validateRestaurant(): boolean {
    this.vName = false;
    if (this.restaurant.name) this.vName = true;
    this.setFirstMenu();
    return this.vName;
  }

  async addRestaurant() {
    const restaurant = await this.restaurantService.addRestaurant(this.restaurant).toPromise();
    return restaurant;
  }

  // Menu

  setFirstMenu(): void {
    let restaurantId = this.restaurant.id;
    if (restaurantId != null) {
      this.restaurantService.getRestaurantMenu(restaurantId).subscribe(foodGroups => {
        if ((foodGroups != null) && (foodGroups.length > 0)) { this.orderPack.menuSource = 1; return; }
      });
    }
    if (this.restaurant.url != null) { this.orderPack.menuSource = 2; return; }
    this.orderPack.menuSource = 3;
  }

  setFormOrderMenu(orderMenu: OrderMenu): void {
    this.formOrderMenu = orderMenu;
  }

  addOrderMenu(): void {
    let newMenu = new OrderMenu();
    newMenu.name = "Nazwa...";
    this.orderMenus ? this.orderMenus.push(newMenu) : this.orderMenus = [newMenu];
    this.setFormOrderMenu(newMenu);
  }

  removeOrderMenu(orderMenu: OrderMenu): void {
    let index = this.orderMenus.indexOf(orderMenu);
    this.orderMenus.splice(index, 1);
  }

  validateMenuUrl(): boolean {
    this.vUrl = false;
    if (this.restaurant.url) this.vUrl = true;
    return this.vUrl;
  }

  validateMenuOrder(): boolean {
    this.vMenu = false;
    this.vPrice = false;
    if (this.formOrderMenu.name) this.vMenu = true;
    if (this.formOrderMenu.price) this.vPrice = true;
    return (this.vMenu && this.vPrice);
  }

  // Order pack

  async startOrderPack() {
    if (!this.restaurant.id) this.restaurant = await this.addRestaurant();
    this.orderPack.restaurantId = this.restaurant.id;
    if (this.orderMenus) this.orderPack.orderMenus = this.orderMenus;
    this.orderPackService.addOrderPack(this.orderPack).subscribe(orderPack => {
      this.orderPack = orderPack;
      this.router.navigate(['/orderpacks', orderPack['id']]);
    }, (err) => { console.log(err); });
  }

  // Style display functions

  styleDisplay(n: number): string {
    if (n == this.currentTab) return "block";
    else return "none";
  }

  nextPrev(n: number) {
    if (this.validateInput() || n < 0) this.currentTab = this.currentTab + n;
  }

  stepName(n: number): string {
    if (n == this.currentTab) return "step active";
    else if (n < this.currentTab) return "step finish"
    else return "step";
  }

}
