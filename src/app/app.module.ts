import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/modals/login/login.component';
import { httpInterceptorProviders } from './core/auth/shared/auth-interceptor';
import { OrderPackNewComponent } from './orders/order-pack-new/order-pack-new.component';
import { OrderPackDetailComponent } from './orders/order-pack-detail/order-pack-detail.component';
import { OrderHeadDetailComponent } from './orders/order-head-detail/order-head-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OrderPackNewComponent,
    OrderPackDetailComponent,
    OrderHeadDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
