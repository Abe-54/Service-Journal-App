import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createNewUser } from "../api";
import useAuthStore from "./AuthStore";

type UserStoreActions = {
  userCredentials: () => Promise<string | null>;
  userId: () => Promise<string | null>;
};

const useUserStore = create<UserStoreActions>((set) => ({
  userCredentials: async () => {
    return getUserCredentialsFromStorage();
  },
  userId: async () => {
    return getUserIdFromStorage();
  },
}));

const getUserCredentialsFromStorage = async () => {
  let userCredentials = null;

  if (Platform.OS === "web") {
    userCredentials = localStorage.getItem("idToken");
  } else {
    userCredentials = await SecureStore.getItemAsync("idToken");
  }

  return userCredentials;
};

const getUserIdFromStorage = async () => {
  let userId = null;

  if (Platform.OS === "web") {
    userId = localStorage.getItem("firebaseUserId");
  } else {
    userId = await SecureStore.getItemAsync("firebaseUserId");
  }

  return userId;
};

export default useUserStore;
