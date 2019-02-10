import { FoodItem } from './food-item';

export class FoodGroup {
    id: number;
	name: string;
	restaurantId: number;
	foodItems: Array<FoodItem> = [];
	
	constructor(restaurantId){
        this.restaurantId = restaurantId;
    }
}
