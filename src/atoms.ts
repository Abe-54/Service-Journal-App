import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { getClients } from "./api";
import { Client } from "./interfaces/Client";

export const userIdAtom = atom("1");

export const clientsListAtom = () => {
  const [clientsAtom] = atomsWithQuery((get) => ({
    queryKey: ["user", get(userIdAtom)],
    queryFn: async ({ queryKey: [, id] }) => {
      return getClients(id as string);
    },
  }));

  return clientsAtom;
};