import * as SecureStore from "expo-secure-store";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Platform } from "react-native";
import { create } from "zustand";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createNewUser } from "../api";
import useUserStore from "./UserStore";

const auth = FIREBASE_AUTH;

type AuthStoreState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUpMode: boolean;
};

type AuthStoreActions = {
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
  toggleSignUpMode: () => void;
};

const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  signUpMode: true,
  toggleSignUpMode: () => set((state) => ({ signUpMode: !state.signUpMode })),
  signin: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUserId = response.user.uid;
      const idToken = await response.user.getIdToken(false);

      console.log("firebaseUserId: ", firebaseUserId);
      await SecureStore.setItemAsync("firebaseUserId", firebaseUserId);
      await SecureStore.setItemAsync("idToken", idToken);

      console.log(response);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  signup: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUserId = userCredential.user.uid;
      const idToken = await userCredential.user.getIdToken(false);

      console.log("firebaseUserId: ", firebaseUserId);
      await SecureStore.setItemAsync("firebaseUserId", firebaseUserId);
      await SecureStore.setItemAsync("idToken", idToken);

      createNewUser(firebaseUserId, "Name", "Company Name");

      console.log(userCredential);
      alert("Sign Up Successful");
      return true;
    } catch (error) {
      // Handle signup error
      console.error("Signup error:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  signout: async () => {
    try {
      await SecureStore.deleteItemAsync("firebaseUserId");
      await SecureStore.deleteItemAsync("idToken");

      await signOut(auth);
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = await SecureStore.getItemAsync("userId");
    const userCredentials = await SecureStore.getItemAsync("idToken");
    useAuthStore.setState({ user, isLoggedIn: !!user });
    useUserStore.setState({ userCredentials, userId });
  } else {
    useAuthStore.setState({ user: null, isLoggedIn: false });
    useUserStore.setState({ userCredentials: null, userId: null });
  }
});

export default useAuthStore;
