// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/auth';

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

interface User {
  username: string;
  role: string;
  token: string;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginService(username, password);
      const loggedInUser: User = {
        username,
        role: response.role, // Asumiendo que la API devuelve el rol
        token: response.token,
      };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  const register = async (username: string, password: string, role: string) => {
    try {
      await registerService(username, password, role);
      await login(username, password);
    } catch (error) {
      console.error(error);
      alert('Error al registrar');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};