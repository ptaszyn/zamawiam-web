import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../../shared/models/food-item';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { RestaurantMenuComponent } from '../../restaurant-menu/restaurant-menu.component';
import { FoodGroup } from '../../shared/models/food-group';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  @Input() foodItem: FoodItem;
  @Input() foodGroup: FoodGroup;

  constructor(
    private restaurantService: RestaurantService,
    private restaurantMenu: RestaurantMenuComponent
  ) { }

  ngOnInit() {
  }

  addFoodItem(foodItem: FoodItem): void {
    foodItem.foodGroupId = this.foodGroup.id;
    this.restaurantService.addFoodItem(foodItem, this.foodGroup)
      .subscribe(foodItem => {
        this.restaurantMenu.getFoodGroups();
        //this.foodGroup.foodItems = this.foodGroup.foodItems || [];
      });
  }

  putFoodItem(foodItem: FoodItem): void {
    //let index = this.foodGroup.foodItems.indexOf(foodItem);
    this.restaurantService.putFoodItem(foodItem, this.foodGroup)
      .subscribe(foodItem => {
        //this.foodGroup.foodItems[index] = foodItem;
        this.restaurantMenu.getFoodGroups();
      });
  }

  // Display functions

  noneModalFi(idGroup: string, idModal: string): void {
    idModal ? idModal : idModal = '';
    document.getElementById('fg'.concat(idGroup, 'fi', idModal)).style.display = 'none';
  }
}
