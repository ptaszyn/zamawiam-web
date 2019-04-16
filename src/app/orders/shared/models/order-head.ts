import { OrderItem } from './order-item';

export class OrderHead {
    id: number;
    orderPackId: number;
    userId: number;
    userName: string;
    amount: number;
    payment: string;
    paid: string;
    comment: string;
    message: string;
    orderItems: OrderItem[];
}
