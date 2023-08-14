import { create } from "zustand";
import { Client } from "../types/Client";
import { Service } from "../types/Service";

type NewEntryStoreState = {
  selectedClientId: number | null;
  selectedServiceId: number | null;
  entryStatus: string | null;
  entryDate: Date | null;
  entryPrice: number | null;
  entryDescription: string | null;
};

type NewEntryStoreActions = {
  setSelectedClientId: (client: number | null) => void;
  setSelectedServiceId: (service: number | null) => void;
  setEntryStatus: (status: string | null) => void;
  setEntryDate: (date: Date | null) => void;
  setEntryPrice: (price: number | null) => void;
  setEntryDescription: (description: string | null) => void;
  resetStore: () => void;
};

const useNewEntryStore = create<NewEntryStoreState & NewEntryStoreActions>(
  (set) => ({
    selectedClientId: null,
    selectedServiceId: null,
    entryStatus: null,
    entryDate: null,
    entryPrice: null,
    entryDescription: null,

    setSelectedClientId: (clientId: number | null) =>
      set({ selectedClientId: clientId }),
    setSelectedServiceId: (serviceId: number | null) =>
      set({ selectedServiceId: serviceId }),
    setEntryStatus: (status: string | null) => set({ entryStatus: status }),
    setEntryDate: (date: Date | null) => set({ entryDate: date }),
    setEntryPrice: (price: number | null) => set({ entryPrice: price }),
    setEntryDescription: (description: string | null) =>
      set({ entryDescription: description }),
    resetStore: () =>
      set({
        selectedClientId: null,
        selectedServiceId: null,
        entryStatus: null,
        entryDate: null,
        entryPrice: null,
        entryDescription: null,
      }),
  })
);

export default useNewEntryStore;
