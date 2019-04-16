import { OrderMenu } from './order-menu';

export class OrderPack {
    id: number;
    userId: number;
    restaurantId: number;
    restaurantName: string;
    comment: string;
    menuSource: number;
    timeLimit: Date;
    created: Date;
    orderStatusId: number;
    orderStatusName: string;
    orderMenus: OrderMenu[];
}
