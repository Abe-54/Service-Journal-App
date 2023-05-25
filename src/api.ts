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

export const getClientInvoices = async (userId: string, clientId: string) => {
  const res = await invoiceTrackerURL.get(`${userId}/invoices/${clientId}`);
  console.log(res.data);
  return res.data;
};

