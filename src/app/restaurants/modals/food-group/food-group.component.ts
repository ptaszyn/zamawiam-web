import { Component, OnInit, Input } from '@angular/core';

import { FoodGroup } from '../../shared/models/food-group';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { RestaurantMenuComponent } from '../../restaurant-menu/restaurant-menu.component';

@Component({
  selector: 'app-food-group',
  templateUrl: './food-group.component.html',
  styleUrls: ['./food-group.component.css']
})
export class FoodGroupComponent implements OnInit {

  @Input() foodGroup: FoodGroup;
  sideFoodGroups: FoodGroup[];

  constructor(
    private restaurantService: RestaurantService,
    private restaurantMenu: RestaurantMenuComponent
  ) { }

  ngOnInit() {
    this.getSideFoodGroups();
  }

  addFoodGroup(foodGroup: FoodGroup): void {
    this.restaurantService.addFoodGroup(foodGroup)
      .subscribe(foodGroup => {
        this.restaurantMenu.foodGroups.push(foodGroup);
        this.restaurantMenu.getFoodGroups();
      });
  }

  putFoodGroup(foodGroup: FoodGroup): void {
    let index = this.restaurantMenu.foodGroups.indexOf(foodGroup);
    this.restaurantService.putFoodGroup(foodGroup)
      .subscribe(foodGroup => {
        this.restaurantMenu.foodGroups[index] = foodGroup;
        this.restaurantMenu.getFoodGroups();
      });
  }

  getSideFoodGroups(): void {
    if (this.restaurantMenu.foodGroups) {
      this.sideFoodGroups = this.restaurantMenu.foodGroups.filter(foodGroup => (!foodGroup.isMain));
    }
  }

  // Display functions

  noneModalFg(idModal: number): void {
    //idModal ? idModal : idModal = '';
    document.getElementById('fg' + idModal.toString()).style.display = 'none';
  }

}
