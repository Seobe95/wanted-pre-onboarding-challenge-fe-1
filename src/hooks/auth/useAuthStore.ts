import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  deleteLocalStorage,
  setLocalstorage,
} from '../../lib/function/localstorage';

interface AuthState {
  token: string;
  type: 'LOGIN' | 'REGIST';
  setType: () => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        type: 'LOGIN',
        token: '',
        setType: () => {
          const current = get().type;
          if (current === 'LOGIN') {
            set(() => ({ type: 'REGIST' }));
          } else {
            set(() => ({ type: 'LOGIN' }));
          }
        },
        setToken: (token) => {
          setLocalstorage(token);
          set(() => ({ token: token }));
        },
        logout: () => {
          deleteLocalStorage('token');
          set(() => ({ token: '' }));
        },
      }),
      {
        name: 'AUTH',
      },
    ),
  ),
);

export default useAuthStore;
