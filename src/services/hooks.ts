import { useState, useEffect, useCallback } from 'react';
import { apiClient } from './api';

export interface User {
  id: string | number;
  email: string;
  first_name: string;
  last_name: string;
  created_at?: string;
}

export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image_url: string;
  status: string;
  price_change: number;
  description?: string;
}

export interface Alert {
  id: number;
  user_id: number;
  property_id: number | null;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  property_name?: string;
}

export interface Deal {
  id: number;
  user_id: number;
  property_id: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  name?: string;
  price?: number;
  location?: string;
  image_url?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
}

// Auth Hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const response = await apiClient.getProfile();
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        apiClient.clearToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.login(email, password);
      apiClient.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.signup(email, password, firstName, lastName);
      apiClient.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return { user, loading, error, isAuthenticated, login, signup, logout };
};

// Properties Hook
export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getProperties();
        setProperties(response.properties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getProperty = useCallback(async (id: string) => {
    try {
      const response = await apiClient.getProperty(id);
      return response.property;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load property');
      throw err;
    }
  }, []);

  const saveProperty = useCallback(async (id: string) => {
    try {
      await apiClient.saveProperty(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save property');
      throw err;
    }
  }, []);

  const unsaveProperty = useCallback(async (id: string) => {
    try {
      await apiClient.unsaveProperty(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unsave property');
      throw err;
    }
  }, []);

  return { properties, loading, error, getProperty, saveProperty, unsaveProperty };
};

// Saved Properties Hook
export const useSavedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSaved = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getSavedProperties();
      setProperties(response.properties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      fetchSaved();
    }
  }, [fetchSaved]);

  return { properties, loading, error, refetch: fetchSaved };
};

// Alerts Hook
export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAlerts();
      setAlerts(response.alerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      fetchAlerts();
    }
  }, [fetchAlerts]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await apiClient.markAlertAsRead(id);
      setAlerts(prev => prev.map(a => a.id === parseInt(id) ? { ...a, read: true } : a));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark alert as read');
      throw err;
    }
  }, []);

  const deleteAlert = useCallback(async (id: string) => {
    try {
      await apiClient.deleteAlert(id);
      setAlerts(prev => prev.filter(a => a.id !== parseInt(id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete alert');
      throw err;
    }
  }, []);

  const createAlert = useCallback(async (type: string, title: string, message: string, propertyId?: string) => {
    try {
      const response = await apiClient.createAlert(type, title, message, propertyId);
      setAlerts(prev => [response.alert, ...prev]);
      return response.alert;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create alert');
      throw err;
    }
  }, []);

  return { alerts, loading, error, markAsRead, deleteAlert, createAlert, refetch: fetchAlerts };
};

// Deals Hook
export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getDeals();
      setDeals(response.deals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      fetchDeals();
    }
  }, [fetchDeals]);

  const getDeal = useCallback(async (id: string) => {
    try {
      const response = await apiClient.getDeal(id);
      return response.deal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load deal');
      throw err;
    }
  }, []);

  const createDeal = useCallback(async (propertyId: string, status?: string, notes?: string) => {
    try {
      const response = await apiClient.createDeal(propertyId, status, notes);
      setDeals(prev => [response.deal, ...prev]);
      return response.deal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create deal');
      throw err;
    }
  }, []);

  const updateDeal = useCallback(async (id: string, status?: string, notes?: string) => {
    try {
      const response = await apiClient.updateDeal(id, status, notes);
      setDeals(prev => prev.map(d => d.id === parseInt(id) ? response.deal : d));
      return response.deal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update deal');
      throw err;
    }
  }, []);

  const deleteDeal = useCallback(async (id: string) => {
    try {
      await apiClient.deleteDeal(id);
      setDeals(prev => prev.filter(d => d.id !== parseInt(id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete deal');
      throw err;
    }
  }, []);

  return { deals, loading, error, getDeal, createDeal, updateDeal, deleteDeal, refetch: fetchDeals };
};

// Dashboard Stats Hook
export const useDashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          setLoading(true);
          const response = await apiClient.getDashboardStats();
          setStats(response);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
