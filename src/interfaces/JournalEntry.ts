import { Client } from "./Client";

export interface JournalEntry {
    journalEntry_id: number;
    user_id: number;
    client_id: number;
    status: string;
    serviceDates: ServiceDates[];
    price: string;
    description: string;
    service: string;
}