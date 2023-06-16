import {
    Auth,
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import create from "zustand";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createNewUser } from "../api";

const auth = FIREBASE_AUTH;

type AuthStoreState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUpMode: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  toggleSignUpMode: () => void;
};

const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  signUpMode: true,
  toggleSignUpMode: () => set((state) => ({ signUpMode: !state.signUpMode })),
  signin: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error("Login error:", error);
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

      createNewUser(idToken, firebaseUserId, "name", "company");
      console.log(userCredential);
      alert("Sign Up Successful, Check your email!");
    } catch (error) {
      // Handle signup error
      console.error("Signup error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  signout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, isLoggedIn: !!user });
});

export default useAuthStore;
