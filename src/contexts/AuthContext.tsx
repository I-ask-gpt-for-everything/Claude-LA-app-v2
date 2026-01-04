import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { getUserById, createUser, updateUser } from '../services/firestore';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Sync user data from Firestore
  const syncUserData = useCallback(async (fbUser: FirebaseUser, isNewLogin = false) => {
    try {
      let userData = await getUserById(fbUser.uid);

      // Create user document if it doesn't exist
      if (!userData) {
        await createUser(fbUser.uid, {
          email: fbUser.email || '',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          photoURL: fbUser.photoURL,
          preferredLanguage: 'el',
          theme: 'system',
        });
        userData = await getUserById(fbUser.uid);
      } else if (isNewLogin) {
        // Update lastLoginAt for existing users on new login
        await updateUser(fbUser.uid, {
          photoURL: fbUser.photoURL,
          displayName: fbUser.displayName || userData.displayName,
        });
      }

      setUser(userData);
    } catch (err) {
      console.error('Error syncing user data:', err);
      // Still set basic user info from Firebase
      setUser({
        id: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || 'User',
        photoURL: fbUser.photoURL,
        preferredLanguage: 'el',
        theme: 'system',
      } as User);
    }
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        await syncUserData(fbUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserData]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      // Sync user data with isNewLogin=true to update lastLoginAt
      await syncUserData(result.user, true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [syncUserData]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with display name
      await updateProfile(result.user, { displayName });

      // Create user document
      await createUser(result.user.uid, {
        email,
        displayName,
        photoURL: null,
        preferredLanguage: 'el',
        theme: 'system',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign up';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        isAuthenticated: !!user,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
