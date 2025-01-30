import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const AUTH_STORAGE_KEY = '@auth_store';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  useEffect(() => {
    let isMounted = true;
    
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (isMounted && userData) {
          const user = JSON.parse(userData);
          setState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to restore authentication state',
            isLoading: false
          }));
        }
      } finally {
        if (isMounted) {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    checkUser();
    return () => { isMounted = false; };
  }, []);

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      const mockUser = { id: '1', email, name: 'Test User' };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setState(prev => ({
        ...prev,
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      }));
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        error: 'Authentication failed',
        isLoading: false
      }));
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      const mockUser = { id: '1', email, name };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setState(prev => ({
        ...prev,
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      }));
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({
        ...prev,
        error: 'Registration failed',
        isLoading: false
      }));
      Alert.alert('Registration Failed', 'Something went wrong. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setState(INITIAL_STATE);
      router.replace('/(auth)/Login');
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        error: 'Sign out failed',
        isLoading: false
      }));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state,
        signIn,
        signUp,
        signOut,
        clearError
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

export { AuthContext };