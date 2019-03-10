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
  selectedSideFoodGroups: number[];

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
      .subscribe(foodGroup => {
        this.restaurantMenu.foodGroups.push(foodGroup);
        this.restaurantMenu.getFoodGroups();
      });
  }

  putFoodGroup(foodGroup: FoodGroup): void {
    this.setSideFoodGroups();
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
    // select if food group has sides
    if (this.foodGroup.sideFoodGroups) {
      for (let side of this.foodGroup.sideFoodGroups) {
        if (this.selectedSideFoodGroups) this.selectedSideFoodGroups.push(side.id);
        else this.selectedSideFoodGroups = [side.id];
      }
    }
  }

  changeSide(side: FoodGroup){
    let index = this.selectedSideFoodGroups.indexOf(side.id);
    if(index>=0){
      this.selectedSideFoodGroups.splice(index, 1);
    } else {
      if (this.selectedSideFoodGroups) this.selectedSideFoodGroups.push(side.id);
      else this.selectedSideFoodGroups = [side.id];
    }
  }

  setSideFoodGroups() {
    this.foodGroup.sideFoodGroups=[];
    for (let side of this.sideFoodGroups) {
      let index = this.selectedSideFoodGroups.indexOf(side.id);
      if(index>=0){
        if (this.foodGroup.sideFoodGroups) this.foodGroup.sideFoodGroups.push(side);
        else this.foodGroup.sideFoodGroups = [side];
      }
    }
  }

  // Display functions

  noneModalFg(idModal: number): void {
    let idElement = 'fg' + (idModal ? idModal.toString() : '');
    document.getElementById(idElement).style.display = 'none';
  }

}
