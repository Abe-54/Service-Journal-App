import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createNewUser } from "../api";
import useAuthStore from "./AuthStore";

type UserStoreState = {
  userCredentials: string | null;
  userId: string | null;
};

type UserStoreActions = {
  getUserCredentials: () => void;
  getUserId: () => void;
};

const getUserCredentialsFromStorage = () => {
  let userCredentials = null;
  SecureStore.getItemAsync("userCredentials").then((credentials) => {
    userCredentials = credentials;
  });
  return userCredentials;
};

const getUserIdFromStorage = () => {
  let userId = null;
  SecureStore.getItemAsync("userId").then((id) => {
    userId = id;
  });
  return userId;
};

const useUserStore = create<UserStoreState & UserStoreActions>((set) => ({
  userCredentials: null,
  userId: null,
  getUserCredentials: getUserCredentialsFromStorage,
  getUserId: getUserIdFromStorage,
}));

export default useUserStore;
