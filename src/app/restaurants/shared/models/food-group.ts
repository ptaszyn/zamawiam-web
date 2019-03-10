import { FoodItem } from './food-item';

export class FoodGroup {
    id: number;
	name: string;
	restaurantId: number;
	isMain: boolean = true;
	foodItems: Array<FoodItem> = [];
	sideFoodGroups: Array<FoodGroup> = [];
	
	constructor(restaurantId){
        this.restaurantId = restaurantId;
    }
}
