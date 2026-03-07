import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, User } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/firebase.config";

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const err = error as { message: string };
    throw new Error(err.message);
  }
};

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const err = error as { message: string };
    throw new Error(err.message);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    await signOut(auth);
  } catch (error) {
    const err = error as { message: string };
    throw new Error(err.message);
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const err = error as { message: string };
    throw new Error(err.message);
  }
};
