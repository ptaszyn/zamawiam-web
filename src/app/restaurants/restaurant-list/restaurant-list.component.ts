import { Component, OnInit } from '@angular/core';

import { Restaurant } from '../shared/models/restaurant';
import { RestaurantService } from '../shared/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

  addRestaurant(newRestaurantName: string) {
    const newRestaurant = new Restaurant();
    newRestaurant.name = newRestaurantName;
    this.restaurantService.addRestaurant(newRestaurant).subscribe(restaurant => this.router.navigate(['/restaurants', restaurant.id]));
  }

}
