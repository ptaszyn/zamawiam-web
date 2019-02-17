import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';

import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

import { FoodGroupComponent } from './modals/food-group/food-group.component';
import { FoodItemComponent } from './modals/food-item/food-item.component';

@NgModule({
  declarations: [
    RestaurantMenuComponent, 
    RestaurantDetailComponent, 
    RestaurantListComponent,
    FoodGroupComponent,
    FoodItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RestaurantsRoutingModule
  ]
})
export class RestaurantsModule { }
