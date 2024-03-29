import { API_BASE_URL } from "@env";
import axios from "axios";
import { UserCredential } from "firebase/auth";
import useAuthStore from "./stores/AuthStore";
import useUserStore from "./stores/UserStore";

const serviceJournalURL = axios.create({
  baseURL: API_BASE_URL,
});

serviceJournalURL.interceptors.request.use(
  async (config) => {
    const userCredentials = await useAuthStore.getState().user?.getIdToken();
    // console.info("INTERCEPTOR, userCredentials: ", userCredentials);
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

export const createNewClient = async (
  userId: string,
  client_name: string,
  house_number: number,
  street: string,
  city: string
) => {
  const res = await serviceJournalURL.post(`${userId}/clients/new`, {
    client_name: client_name,
    house_number: house_number,
    street: street,
    city: city,
  });
  console.log(res.data);
  return res.data;
};

export const deleteClient = async (userId: string, clientId: number) => {
  const res = await serviceJournalURL.delete(
    `${userId}/clients/delete/single`,
    {
      data: {
        client_id: clientId,
      },
    }
  );
  console.log(res.data);
  return res.data;
};

export const getUser = async (userId: string) => {
  const res = await serviceJournalURL.get(`${userId}`);
  console.log(res.data);
  return res.data;
};

export const getClients = async (userId: string) => {
  const res = await serviceJournalURL.get(`${userId}/clients/`);
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

export const createJournalEntry = async (
  userId: string,
  clientId: number,
  status: string,
  description: string,
  service_id: number,
  price: number,
  service_date: Date
) => {
  const res = await serviceJournalURL.post(`${userId}/journal/new_entry`, {
    client_id: clientId,
    status: status,
    description: description,
    service_id: service_id,
    price: price,
    service_date: service_date,
  });
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
