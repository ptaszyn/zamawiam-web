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
  newFoodItem: FoodItem = new FoodItem();

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id');
    this.newFoodGroup =  new FoodGroup(this.restaurantId);
    this.getFoodGroups();
  }
  
  // FoodGroup

  getFoodGroups(): void {
    this.restaurantService.getRestaurantMenu(this.restaurantId).subscribe(foodGroups => {
      this.foodGroups = foodGroups;
    });
  }

  // FoodItem

  addFoodItem(foodItem: FoodItem, foodGroup: FoodGroup): void {
    foodItem.foodGroupId = foodGroup.id;
    this.restaurantService.addFoodItem(foodItem, foodGroup)
      .subscribe(foodItem => {
        foodGroup.foodItems = foodGroup.foodItems || [];
      });
  }

  putFoodItem(foodItem: FoodItem, foodGroup: FoodGroup): void {
    let index = foodGroup.foodItems.indexOf(foodItem);
    this.restaurantService.putFoodItem(foodItem, foodGroup)
      .subscribe(foodItem => {
        foodGroup.foodItems[index] = foodItem;
      });
  }

}
