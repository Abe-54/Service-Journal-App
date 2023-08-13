import { create } from "zustand";
import { Client } from "../types/Client";
import { Service } from "../types/Service";

type NewEntryStoreState = {
  selectedClientId: number | null;
  selectedServiceId: number | null;
};

type NewEntryStoreActions = {
  setSelectedClientId: (client: number | null) => void;
  setSelectedServiceId: (service: number | null) => void;
  resetStore: () => void;
};

const useNewEntryStore = create<NewEntryStoreState & NewEntryStoreActions>(
  (set) => ({
    selectedClientId: null,
    selectedServiceId: null,

    setSelectedClientId: (clientId: number | null) =>
      set({ selectedClientId: clientId }),
    setSelectedServiceId: (serviceId: number | null) =>
      set({ selectedServiceId: serviceId }),
    resetStore: () => set({ selectedClientId: null, selectedServiceId: null }),
  })
);

export default useNewEntryStore;
