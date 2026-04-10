
import { useState, useEffect, useCallback } from 'react';

export interface User {
  username: string;
  displayName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const STORAGE_KEY = 'tech_monopoly_auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const register = useCallback((username: string, password: string, displayName: string): { success: boolean; error?: string } => {
    // Get existing users
    const usersKey = 'tech_monopoly_users';
    const existingUsers = JSON.parse(localStorage.getItem(usersKey) || '{}');

    if (existingUsers[username]) {
      return { success: false, error: 'Username already exists' };
    }

    if (username.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Store user (in a real app, you'd hash the password)
    existingUsers[username] = {
      username,
      password, // Note: In production, NEVER store plain text passwords
      displayName: displayName || username,
    };
    localStorage.setItem(usersKey, JSON.stringify(existingUsers));

    // Auto-login after registration
    const user: User = { username, displayName: displayName || username };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setAuthState({ user, isAuthenticated: true, isLoading: false });

    return { success: true };
  }, []);

  const login = useCallback((username: string, password: string): { success: boolean; error?: string } => {
    const usersKey = 'tech_monopoly_users';
    const existingUsers = JSON.parse(localStorage.getItem(usersKey) || '{}');
    const storedUser = existingUsers[username];

    if (!storedUser) {
      return { success: false, error: 'User not found' };
    }

    if (storedUser.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const user: User = { username, displayName: storedUser.displayName };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setAuthState({ user, isAuthenticated: true, isLoading: false });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    register,
    login,
    logout,
  };
};
