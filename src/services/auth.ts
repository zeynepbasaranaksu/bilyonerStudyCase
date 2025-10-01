import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser, IdTokenResult } from 'firebase/auth';
import { auth } from '../firebase/config';
import { analyticsService } from './analytics';

// Mock user
const createMockUser = (email: string): FirebaseUser => ({
  uid: `mock_${Date.now()}`,
  email,
  displayName: email.split('@')[0],
  emailVerified: true,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
  metadata: {} as Record<string, unknown>,
  providerData: [],
  refreshToken: 'mock_token',
  tenantId: null,
  delete: async () => { },
  getIdToken: async () => 'mock_token',
  getIdTokenResult: async () => ({} as IdTokenResult),
  reload: async () => { },
  toJSON: () => ({}),
});

export const authService = {
  signIn: async (email: string, password: string) => {
    if (!auth) {
      console.log('Creating mock user');
      return createMockUser(email);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      analyticsService.logUserLogin(userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string) => {
    if (!auth) {
      console.log('Creating mock user');
      return createMockUser(email);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      analyticsService.logUserLogin(userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signOut: async () => {
    if (!auth) {
      console.log('Signing out');
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        analyticsService.logUserLogout(currentUser.uid);
      }
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  onAuthStateChange: (callback: (user: FirebaseUser | null) => void) => {
    if (!auth) {
      return () => { };
    }
    return onAuthStateChanged(auth, callback);
  },


  triggerAuthStateChange: (user: FirebaseUser | null) => {
    console.log(' Auth state changed', user ? 'User logged in' : 'User logged out');
  },
};
