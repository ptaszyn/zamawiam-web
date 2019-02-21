import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderPackNewComponent } from './order-pack-new/order-pack-new.component';
import { OrderPackDetailComponent } from './order-pack-detail/order-pack-detail.component';
import { OrderHeadDetailComponent } from './order-head-detail/order-head-detail.component';

@NgModule({
  declarations: [
    OrderPackNewComponent,
    OrderPackDetailComponent,
    OrderHeadDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
