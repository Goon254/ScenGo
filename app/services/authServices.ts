import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'your-api-url'; // Update with your backend URL

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  private async setToken(token: string) {
    await AsyncStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      await this.setToken(token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/register`, data);
      const { token, user } = response.data;
      await this.setToken(token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async checkAuthStatus(): Promise<LoginResponse | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return null;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get<LoginResponse>(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      await this.logout();
      return null;
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'An error occurred';
      return new Error(message);
    }
    return error;
  }
}

const authService = new AuthService();
export default authService;
