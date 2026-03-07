/**
 * Auth Service
 * Handles Firebase authentication operations
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/services/api/firebase/firebase.config';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        return { success: false, error: 'Firebase not configured' };
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      const err = error as { code?: string; message: string };
      return {
        success: false,
        error: err.message || 'Failed to sign in',
      };
    }
  },

  /**
   * Register a new user
   */
  signUp: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        return { success: false, error: 'Firebase not configured' };
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      const err = error as { code?: string; message: string };
      return {
        success: false,
        error: err.message || 'Failed to register',
      };
    }
  },

  /**
   * Sign out current user
   */
  signOut: async (): Promise<void> => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string): Promise<AuthResult> => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        return { success: false, error: 'Firebase not configured' };
      }
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
      };
    } catch (error) {
      const err = error as { code?: string; message: string };
      return {
        success: false,
        error: err.message || 'Failed to send reset email',
      };
    }
  },

  /**
   * Listen to authentication state changes
   */
  onAuthChange: (callback: (user: User | null) => void) => {
    const auth = getFirebaseAuth();
    if (!auth) return () => {};
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Get current user
   */
  getCurrentUser: (): User | null => {
    const auth = getFirebaseAuth();
    return auth ? auth.currentUser : null;
  },
};

export default authService;
