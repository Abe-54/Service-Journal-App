import { Client } from "./Client";
import { Order } from "./Order";

export interface Invoice {
    invoice_id: number;
    user_id: number;
    client_id: number;
    order_id: number;
    status: string;
    Orders: Order[];
}