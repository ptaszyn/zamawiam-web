import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHeadDetailComponent } from './order-head-detail/order-head-detail.component';
import { OrderPackNewComponent } from './order-pack-new/order-pack-new.component';
import { OrderPackDetailComponent } from './order-pack-detail/order-pack-detail.component';
import { OrderPackListComponent } from './order-pack-list/order-pack-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'new', component: OrderPackNewComponent },
      { path: 'my', component: OrderPackListComponent },
      { path: ':id', component: OrderPackDetailComponent },
      { path: ':idPack/order/:id', component: OrderHeadDetailComponent },
      { path: ':idPack/order', component: OrderHeadDetailComponent },
      { path: '', component: OrderPackListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
