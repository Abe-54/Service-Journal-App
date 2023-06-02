import { API_BASE_URL } from "@env";
import axios from "axios";

const invoiceTrackerURL = axios.create({
  baseURL: API_BASE_URL,
});

export const getClients = async (id: string) => {
  const res = await invoiceTrackerURL.get(`${id}/clients/`);
  console.log(res.data);
  return res.data;
};

export const getSingleClient = async (userId: string, clientId: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/clients/${clientId}`);
  console.log(res.data);
  return res.data;
};

export const getClientJournal = async (userId: string, clientId: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/journal/client=${clientId}`);
  console.log(res.data);
  return res.data;
};

export const getJournalEntry = async (userId: string, clientId: string, journalEntryId: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/journal/client=${clientId}/journal_entry=${journalEntryId}`);
  console.log(res.data);
  return res.data;
};

export const updateJournalEntry = async (journalEntryId: string, data: any) => {
  const res = await invoiceTrackerURL.patch(`/update/journal_entry=${journalEntryId}`, data);
  console.log("New Journal Data: ", res.data);
  return res.data;
};

export const getAllServices = async (userId: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/services/`);
  console.log(res.data);
  return res.data;
}

export const getServiceById = async (userId: string, service_id: number) => {
  const res = await invoiceTrackerURL.get(`${userId}/services/service_id=${service_id}`);
  console.log(res.data); 
  return res.data;
};

export const getServiceByName = async (userId: string, serviceName: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/services/service_name=${serviceName}`);
  console.log(res.data); 
  return res.data;
};

