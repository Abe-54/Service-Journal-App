import { Service } from "./Service";

export interface Order {
    order_id: number;
    client_id: number;
    service_date: Date;
    service_id: number;
    Services: Service;
}