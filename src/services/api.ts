const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getHeaders(includeAuth = true) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(includeAuth),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signup(email: string, password: string, firstName: string, lastName: string) {
    const response = await this.request<any>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      },
      false
    );
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<any>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      false
    );
    return response;
  }

  async getProfile() {
    return this.request<any>('/auth/profile');
  }

  async updateProfile(firstName: string, lastName: string) {
    return this.request<any>(
      '/auth/profile',
      {
        method: 'PUT',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      }
    );
  }

  // Properties endpoints
  async getProperties() {
    return this.request<any>('/properties', {}, false);
  }

  async getProperty(id: string) {
    return this.request<any>(`/properties/${id}`, {}, false);
  }

  async saveProperty(id: string) {
    return this.request<any>(
      `/properties/${id}/save`,
      { method: 'POST' }
    );
  }

  async unsaveProperty(id: string) {
    return this.request<any>(
      `/properties/${id}/save`,
      { method: 'DELETE' }
    );
  }

  async getSavedProperties() {
    return this.request<any>('/properties/user/saved');
  }

  // Alerts endpoints
  async getAlerts() {
    return this.request<any>('/alerts');
  }

  async getUnreadAlertCount() {
    return this.request<any>('/alerts/unread/count');
  }

  async markAlertAsRead(id: string) {
    return this.request<any>(
      `/alerts/${id}/read`,
      { method: 'PUT' }
    );
  }

  async deleteAlert(id: string) {
    return this.request<any>(
      `/alerts/${id}`,
      { method: 'DELETE' }
    );
  }

  async createAlert(type: string, title: string, message: string, propertyId?: string) {
    return this.request<any>(
      '/alerts',
      {
        method: 'POST',
        body: JSON.stringify({
          type,
          title,
          message,
          property_id: propertyId || null,
        }),
      }
    );
  }

  // Deals endpoints
  async getDeals() {
    return this.request<any>('/deals');
  }

  async getDeal(id: string) {
    return this.request<any>(`/deals/${id}`);
  }

  async createDeal(propertyId: string, status?: string, notes?: string) {
    return this.request<any>(
      '/deals',
      {
        method: 'POST',
        body: JSON.stringify({
          property_id: propertyId,
          status: status || 'pending',
          notes: notes || '',
        }),
      }
    );
  }

  async updateDeal(id: string, status?: string, notes?: string) {
    return this.request<any>(
      `/deals/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          status,
          notes,
        }),
      }
    );
  }

  async deleteDeal(id: string) {
    return this.request<any>(
      `/deals/${id}`,
      { method: 'DELETE' }
    );
  }

  // Dashboard stats
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }

  // Auth helpers
  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiClient = new ApiClient();
