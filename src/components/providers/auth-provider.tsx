"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string;
  email: string;
  name: string;
}

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('react-shop-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('react-shop-user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // Mock API call
    if ((email === "test@test.com" || email === "user@example.com") && pass === "password") {
      const mockUser = { id: '1', email, name: email === "test@test.com" ? 'Test User' : 'Example User' };
      setUser(mockUser);
      localStorage.setItem('react-shop-user', JSON.stringify(mockUser));
      toast({ title: "Login Successful", description: "Welcome back!"});
      router.push('/account');
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: 'destructive'});
      throw new Error("Invalid credentials");
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    // Mock API call
    const mockUser = { id: Date.now().toString(), email, name };
    setUser(mockUser);
    localStorage.setItem('react-shop-user', JSON.stringify(mockUser));
    toast({ title: "Registration Successful", description: `Welcome, ${name}!`});
    router.push('/account');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('react-shop-user');
    toast({ title: "Logged Out", description: "You have been logged out."});
    router.push('/');
  };

  const isAuthenticated = !isLoading && !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isLoading }}>
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
