import { OrderMenu } from './order-menu';

export class OrderPack{
    id: number;
    userId: number;
    restaurantId: number;
    restaurantName: string;
    comment: string;
    menuSource: number;
    timeLimit: Date;
    orderStatusId: number;
    orderStatusName: string;
    statusChanged: Date;
    created: Date;
    orderMenus: OrderMenu[];
}
