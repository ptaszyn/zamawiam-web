import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Restaurant } from '../models/restaurant';
import { FoodGroup } from '../models/food-group';
import { FoodItem } from '../models/food-item';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantsUrl = 'http://localhost:8080/api/restaurants';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.restaurantsUrl, this.options);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}/${id}`;
    return this.http.get<Restaurant>(url);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.restaurantsUrl, restaurant);
  }

  putRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}/${restaurant.id}`;
    return this.http.put<Restaurant>(url, restaurant);
  }

  getRestaurantMenu(id: number): Observable<FoodGroup[]> {
    const url = `${this.restaurantsUrl}/${id}/menu`;
    return this.http.get<FoodGroup[]>(url);
  }

  // FoodGroup

  addFoodGroup(foodGroup: FoodGroup): Observable<FoodGroup> {
    const url = `${this.restaurantsUrl}/${foodGroup.restaurantId}/groups`;
    return this.http.post<FoodGroup>(url, foodGroup);
  }

  putFoodGroup(foodGroup: FoodGroup): Observable<FoodGroup> {
    const url = `${this.restaurantsUrl}/${foodGroup.restaurantId}/groups/${foodGroup.id}`;
    return this.http.put<FoodGroup>(url, foodGroup);
  }

  // FoodItem

  addFoodItem(foodItem: FoodItem, foodGroup: FoodGroup): Observable<FoodItem> {
    const url = `${this.restaurantsUrl}/${foodGroup.restaurantId}/groups/${foodGroup.id}/items`;
    return this.http.post<FoodItem>(url, foodItem);
  }

  putFoodItem(foodItem: FoodItem, foodGroup: FoodGroup): Observable<FoodItem> {
    const url = `${this.restaurantsUrl}/${foodGroup.restaurantId}/groups/${foodGroup.id}/items/${foodItem.id}`;
    return this.http.put<FoodItem>(url, foodItem);
  }

}
