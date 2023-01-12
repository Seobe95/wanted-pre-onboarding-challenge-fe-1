import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthInputForm } from './types';

interface AuthInputState {
  form: AuthInputForm;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialize: () => void;
}

const useAuthInputStore = create<AuthInputState>()(
  devtools((set) => ({
    form: {
      id: '',
      password: '',
      passwordConfirm: '',
    },
    onInputChange: (e) => {
      const { name, value } = e.target;
      if (name === 'id') {
        set((state) => ({ form: { ...state.form, id: value } }));
      } else if (name === 'password') {
        set((state) => ({ form: { ...state.form, password: value } }));
      } else if (name === 'passwordConfirm') {
        set((state) => ({
          form: { ...state.form, passwordConfirm: value },
        }));
      }
    },
    initialize: () =>
      set(() => ({ form: { id: '', password: '', passwordConfirm: '' } })),
  })),
);

export default useAuthInputStore;
