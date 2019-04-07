export class OrderItem {
    id: number;
    orderHeadId: number;
    orderMenuId: number;
    foodItemId: number;
    ownOrder: string;
    amount: number = 0;
    sideOrderItems: OrderItem[];
}
