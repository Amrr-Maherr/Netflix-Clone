/**
 * Authentication Types - Firebase auth and user data
 */

import type { User as FirebaseUser } from 'firebase/auth';

// User state in Redux
export interface UserState {
  name: string | null;
  email: string | null;
  image: string | null;
}

// Firebase user data (extended)
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  providerId: string;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

// Auth form inputs
export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordInputs {
  email: string;
}

// Auth response
export interface AuthResponse {
  user: FirebaseUser;
  token?: string;
}

// Auth error
export interface AuthError {
  code: string;
  message: string;
}
