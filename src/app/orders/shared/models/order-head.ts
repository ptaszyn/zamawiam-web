import { OrderItem } from './order-item';

export class OrderHead {
    id: number;
    orderPackId: number;
    userId: number;
    amount: number;
    payment: string;
    paid: string;
    comment: string;
    orderItems: OrderItem[];
}
