import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (token) => set(() => ({ token: token })),
        logout: () => set(() => ({ token: '' })),
      }),
      {
        name: 'AUTH',
      },
    ),
  ),
);

export default useAuthStore;
