import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from '../shared/services/restaurant.service';
import { FoodGroup } from '../shared/models/food-group';
import { FoodItem } from '../shared/models/food-item';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  restaurantId: number;
  foodGroups: FoodGroup[];
  newFoodGroup: FoodGroup;
  newFoodItem: FoodItem;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id');
    this.newFoodGroup = new FoodGroup(this.restaurantId);
    this.newFoodItem = new FoodItem();
    this.getFoodGroups();
  }

  // FoodGroup

  getFoodGroups(): void {
    this.restaurantService.getRestaurantMenu(this.restaurantId).subscribe(foodGroups => {
      this.foodGroups = foodGroups;
    });
  }

  // Display functions

  blockModal(idGroup: string, type: string, idModal: string): void {
    idGroup ? idGroup : idGroup = '';
    type ? type : type = '';
    idModal ? idModal : idModal = '';
    document.getElementById('fg'.concat(idGroup, type, idModal)).style.display = 'block';
  }

}
