import { create } from 'zustand';
import { getTenantSlug } from '../lib/tenant';

interface AuthUser {
  id?: string;
  email?: string;
  name: string;
  role: string;
  tenantSlug?: string;
}

interface AuthState {
  user: AuthUser | null;
  tenantSlug: string;
  isAuth: boolean;
  /** Backward-compatible alias for existing Zustand consumers. */
  isAuthenticated: boolean;
  login: (user: AuthUser, tenantSlug?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tenantSlug: getTenantSlug(),
  isAuth: false,
  isAuthenticated: false,
  login: (user, tenantSlug = user.tenantSlug || getTenantSlug()) => set({
    user: { ...user, tenantSlug },
    tenantSlug,
    isAuth: true,
    isAuthenticated: true,
  }),
  logout: () => set({
    user: null,
    tenantSlug: getTenantSlug(),
    isAuth: false,
    isAuthenticated: false,
  }),
}));
