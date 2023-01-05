import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  deleteLocalStorage,
  setLocalstorage,
} from '../../lib/function/localstorage';
import { AuthInputForm } from './types';

interface AuthState {
  form: AuthInputForm;
  token: string;
  type: 'LOGIN' | 'REGIST';
  setType: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setToken: (token: string) => void;
  initialize: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        form: {
          id: '',
          password: '',
          passwordConfirm: '',
        },
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
        onInputChange: (e) => {
          const { name, value } = e.target;
          if (name === 'id') {
            set((state) => ({ form: { ...state.form, id: value } }));
          } else if (name === 'password') {
            set((state) => ({ form: { ...state.form, password: value } }));
          } else if (name === 'passowordConfirm') {
            set((state) => ({
              form: { ...state.form, passwordConfirm: value },
            }));
          }
        },
        setToken: (token) => {
          setLocalstorage(token);
          set(() => ({ token: token }));
        },
        initialize: () =>
          set(() => ({ form: { id: '', password: '', passwordConfirm: '' } })),
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
