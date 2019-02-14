import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { OrderPackNewComponent } from './orders/order-pack-new/order-pack-new.component';
import { OrderPackDetailComponent } from './orders/order-pack-detail/order-pack-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'restaurants',
    loadChildren: './restaurants/restaurants.module#RestaurantsModule'
  },
  {
    path: 'orderpacks/new',
    component: OrderPackNewComponent
  },
  {
    path: 'orderpacks/:id',
    component: OrderPackDetailComponent
  },/*
  {
    path: 'orderpacks/new',
    component: OrderPackCreateComponent
  },
  {
    path: 'orderpacks/new/:restaurantId',
    component: OrderPackCreateComponent
  },
  {
    path: 'restaurants/new',
    component: RestaurantCreateComponent
  },*/
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
