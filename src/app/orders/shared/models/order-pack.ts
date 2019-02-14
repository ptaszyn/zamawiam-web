import { OrderMenu } from './order-menu';

export class OrderPack {
    id: number;
    userId: number;
    restaurantId: number;
    comment: string;
    menuSource: number;
    orderStatusId: number;
    orderMenus: OrderMenu[];
}
