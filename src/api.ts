import { API_BASE_URL } from "@env";
import axios from "axios";
import { UserCredential } from "firebase/auth";
import useUserStore from "./stores/UserStore";

const serviceJournalURL = axios.create({
  baseURL: API_BASE_URL,
});

serviceJournalURL.interceptors.request.use(
  async (config) => {
    const userCredentials = await useUserStore.getState().userCredentials();
    if (userCredentials) {
      config.headers.Authorization = `Bearer ${userCredentials}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

export const createNewUser = async (
  userId: string,
  user_name: string,
  company_name: string
) => {
  const res = await serviceJournalURL.post("/create/user", {
    user_id: userId,
    user_name: user_name,
    company_name: company_name,
  });
  console.log(res.data);
  return res.data;
};

export const getUser = async (userId: string) => {
  const res = await serviceJournalURL.get(`${userId}`);
  console.log(res.data);
  return res.data;
};

export const getClients = async (id: string) => {
  const res = await serviceJournalURL.get(`${id}/clients/`);
  console.log(res.data);
  return res.data;
};

export const getSingleClient = async (userId: string, clientId: string) => {
  const res = await serviceJournalURL.get(`${userId}/clients/${clientId}`);
  console.log(res.data);
  return res.data;
};

export const getClientJournal = async (userId: string, clientId: string) => {
  const res = await serviceJournalURL.get(
    `${userId}/journal/client=${clientId}`
  );
  console.log(res.data);
  return res.data;
};

export const getJournalEntry = async (
  userId: string,
  clientId: string,
  journalEntryId: string
) => {
  const res = await serviceJournalURL.get(
    `${userId}/journal/client=${clientId}/journal_entry=${journalEntryId}`
  );
  console.log(res.data);
  return res.data;
};

export const updateJournalEntry = async (journalEntryId: string, data: any) => {
  const res = await serviceJournalURL.patch(
    `/update/journal_entry=${journalEntryId}`,
    data
  );
  console.log("New Journal Data: ", res.data);
  return res.data;
};

export const getAllServices = async (userId: string) => {
  const res = await serviceJournalURL.get(`${userId}/services/`);
  console.log(res.data);
  return res.data;
};

export const getServiceById = async (userId: string, service_id: number) => {
  const res = await serviceJournalURL.get(
    `${userId}/services/service_id=${service_id}`
  );
  console.log(res.data);
  return res.data;
};

export const getServiceByName = async (userId: string, serviceName: string) => {
  const res = await serviceJournalURL.get(
    `${userId}/services/service_name=${serviceName}`
  );
  console.log(res.data);
  return res.data;
};
