import { Client } from "./Client";

export interface Invoice {
    invoice_id: number;
    user_id: number;
    client_id: number;
    order_id: number;
    status: string;
    Clients: Client;
    service_dates: Date[];
}