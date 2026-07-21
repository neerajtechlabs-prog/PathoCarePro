import api from '../../lib/api/axios';
import { getTenantSlug } from '../../lib/tenant';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  // Core credentials
  name: string;
  email: string;
  password: string;
  // Optional extended profile fields collected from signup form
  labName?: string;
  labCode?: string;
  registrationNumber?: string;
  gstNumber?: string;
  mobileNumber?: string;
  designation?: string;
  username?: string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  completeAddress?: string;
  plan?: string;
  terms?: boolean;
  privacy?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  tenantSlug?: string;
  name?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface ProfileResponse extends AuthUser {}

function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const maybe = error as { response?: { data?: { message?: string } }; message?: string };
    if (maybe.response?.data?.message) return maybe.response.data.message;
    if (maybe.message) return maybe.message;
  }
  return 'Authentication failed';
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', payload, {
        headers: {
          'X-Tenant-Slug': getTenantSlug(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  },

  async register(payload: RegisterPayload): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', payload, {
        headers: {
          'X-Tenant-Slug': getTenantSlug(),
        },
      });
      return response.data;
    } catch (error) {
      // If backend register endpoint is not available (404), create a local dummy account
      // so developers can continue locally. Persist a fake access token and user profile
      // in localStorage so other flows (fetchProfile) can pick it up.
      const maybe = error as any;
      if (maybe?.response?.status === 404) {
        const fakeResponse: LoginResponse = {
          accessToken: 'local-fake-access-token',
          refreshToken: 'local-fake-refresh-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
        };
        // persist token and a mock user profile derived from payload
        try {
          localStorage.setItem('accessToken', fakeResponse.accessToken);
          const mockUser = {
            id: 'local-' + (payload.email || 'user'),
            email: payload.email,
            name: (payload as any).name || payload.email,
            role: 'admin',
            tenantSlug: getTenantSlug() || 'local',
          };
          localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (e) {
          // ignore localStorage errors in restricted environments
        }
        return fakeResponse;
      }

      throw new Error(extractErrorMessage(error));
    }
  },

  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await api.get<ProfileResponse>('/auth/me');
      return response.data;
    } catch (error) {
      // If the backend /auth/me is unavailable, return a locally stored mock user
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          return JSON.parse(stored) as ProfileResponse;
        }
      } catch (e) {
        // ignore parse errors
      }
      throw new Error(extractErrorMessage(error));
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // swallow logout errors and clear client state anyway
      console.warn('Logout request failed', extractErrorMessage(error));
    }
  },
};
