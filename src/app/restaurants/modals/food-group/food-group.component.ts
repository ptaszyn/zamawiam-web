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
  sideFoodGroups: FoodGroup[]; // list of food group which are not main
  selectedSideFoodGroups: number[]; // list of selected on window food group which are not main

  constructor(
    private restaurantService: RestaurantService,
    private restaurantMenu: RestaurantMenuComponent
  ) { }

  ngOnInit() {
    this.getSideFoodGroups();
  }

  addFoodGroup(foodGroup: FoodGroup): void {
    this.setSideFoodGroups();
    this.restaurantService.addFoodGroup(foodGroup)
      .subscribe(savedFoodGroup => {
        this.restaurantMenu.foodGroups.push(savedFoodGroup);
        this.restaurantMenu.getFoodGroups();
      });
  }

  putFoodGroup(foodGroup: FoodGroup): void {
    this.setSideFoodGroups();
    const index = this.restaurantMenu.foodGroups.indexOf(foodGroup);
    this.restaurantService.putFoodGroup(foodGroup)
      .subscribe(savedFoodGroup => {
        this.restaurantMenu.foodGroups[index] = savedFoodGroup;
        this.restaurantMenu.getFoodGroups();
      });
  }

  getSideFoodGroups(): void {
    this.selectedSideFoodGroups = [];
    if (this.restaurantMenu.foodGroups) {
      this.sideFoodGroups = this.restaurantMenu.foodGroups.filter(foodGroup => (!foodGroup.isMain));
    }
    // select if food group has sides (no-main food groups)
    if (this.foodGroup.sideFoodGroups) {
      for (const side of this.foodGroup.sideFoodGroups) {
        this.selectedSideFoodGroups.push(side.id);
      }
    }
  }

  /*
  * action select/unselect sides (no-main food group)
  */
  changeSide(side: FoodGroup) {
    const index = this.selectedSideFoodGroups.indexOf(side.id);
    if (index >= 0) {
      this.selectedSideFoodGroups.splice(index, 1);
    } else {
      this.selectedSideFoodGroups.push(side.id);
    }
  }
 
  /*
  * add selected side groups to main food group
  */
  setSideFoodGroups() {
    this.foodGroup.sideFoodGroups = [];
    if (!this.sideFoodGroups) {return; }
    for (const side of this.sideFoodGroups) {
      const index = this.selectedSideFoodGroups.indexOf(side.id);
      if (index >= 0) {
        this.foodGroup.sideFoodGroups.push(side);
      }
    }
  }

  // Display functions

  noneModalFg(idModal: number): void {
    const idElement = 'fg' + (idModal ? idModal.toString() : '');
    document.getElementById(idElement).style.display = 'none';
  }

}
