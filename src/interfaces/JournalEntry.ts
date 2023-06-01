import { Client } from "./Client";
import { Service } from "./Service";

export interface JournalEntry {
    journalEntry_id: number;
    user_id: number;
    client_id: number;
    Service: Service;
    status: string;
    serviceDates: ServiceDates[];
    price: string;
    description: string;
}