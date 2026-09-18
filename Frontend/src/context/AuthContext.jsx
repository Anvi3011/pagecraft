import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { registerUser, loginUser, getCurrentUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // true while we check for an existing session
  const [error, setError] = useState(null);

  // On first load, if a token exists, verify it against /auth/me
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const result = await getCurrentUser();
        setUser(result.user);
        setToken(storedToken);
      } catch (err) {
        // Token invalid/expired — clear it
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setError(null);
    const result = await loginUser({ email, password });
    localStorage.setItem('token', result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    const result = await registerUser({ name, email, password });
    localStorage.setItem('token', result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
