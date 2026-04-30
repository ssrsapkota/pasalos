import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userRes = await api.get('/auth/me');
          setUser(userRes.data.data.user);
          
          if (userRes.data.data.user.vendorId) {
            const vendorRes = await api.get('/vendors/me');
            setVendor(vendorRes.data.data.vendor);
          }
        } catch (error) {
          console.error('Auth initialization failed', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    const { token, user: userData } = res.data.data;
    localStorage.setItem('token', token);
    setUser(userData);
    
    if (userData.vendorId) {
      const vendorRes = await api.get('/vendors/me');
      setVendor(vendorRes.data.data.vendor);
    }
    return res.data.data;
  };

  const registerVendor = async (data) => {
    const res = await api.post('/auth/register-vendor', data);
    const { token, user: userData, vendor: vendorData } = res.data.data;
    localStorage.setItem('token', token);
    setUser(userData);
    setVendor(vendorData);
    
    return res.data.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setVendor(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, vendor, loading, login, registerVendor, logout, setUser, setVendor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
