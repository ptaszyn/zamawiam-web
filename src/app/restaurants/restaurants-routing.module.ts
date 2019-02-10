import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':id', component: RestaurantDetailComponent },
      { path: ':id/menu', component: RestaurantMenuComponent },
      { path: '', component: RestaurantListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
