import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { CommonModule } from '@angular/common';
import { FoodGroupComponent } from './modals/food-group/food-group.component';

@NgModule({
  declarations: [
    RestaurantMenuComponent, 
    RestaurantDetailComponent, 
    RestaurantListComponent,
    FoodGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RestaurantsRoutingModule
  ]
})
export class RestaurantsModule { }
