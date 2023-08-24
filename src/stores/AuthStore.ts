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

const auth = FIREBASE_AUTH;

type AuthStoreState = {
  user: User | null;
  guestMode: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUpMode: boolean;
};

type AuthStoreActions = {
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
  toggleSignUpMode: () => void;
  setGuestMode: (mode: boolean) => void;
};

const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  user: null,
  guestMode: false,
  isLoggedIn: false,
  isLoading: false,
  signUpMode: true,
  toggleSignUpMode: () => set((state) => ({ signUpMode: !state.signUpMode })),
  setGuestMode: (mode: boolean) => set({ guestMode: mode }),
  signin: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUserId = response.user.uid;
      const idToken = await response.user.getIdToken(true);

      console.log("firebaseUserId: ", firebaseUserId);

      set({ user: response.user, isLoggedIn: true });

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
      const idToken = await userCredential.user.getIdToken(true);

      console.log("firebaseUserId: ", firebaseUserId);

      set({ user: userCredential.user, isLoggedIn: true });

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
      if (Platform.OS === "web") {
        localStorage.removeItem("firebaseUserId");
        localStorage.removeItem("idToken");
      } else {
        await SecureStore.deleteItemAsync("firebaseUserId");
        await SecureStore.deleteItemAsync("idToken");
      }
      await signOut(auth);
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({ user, isLoggedIn: !!user });
  } else {
    useAuthStore.setState({ user: null, isLoggedIn: false });
  }
});

export default useAuthStore;
