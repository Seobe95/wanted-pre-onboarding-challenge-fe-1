import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TodoInputForm } from './types';

interface TodoInputState {
  form: TodoInputForm;
  setForm: (title: string, content: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialize: () => void;
}

const useTodoInput = create<TodoInputState>()(
  devtools(
    persist(
      (set) => ({
        form: {
          title: '',
          content: '',
        },
        isEditMode: false,
        setForm: (title, content) => {
          set(
            () => ({ form: { title, content } }),
            false,
            'TODOINPUT/SET_FORM',
          );
        },
        onInputChange: (e) => {
          const { name, value } = e.target;
          if (name === 'title') {
            set(
              (state) => ({
                form: { ...state.form, title: value },
              }),
              false,
              'TODOINPUT/TITLE',
            );
          } else if (name === 'content') {
            set(
              (state) => ({
                form: { ...state.form, content: value },
              }),
              false,
              'TODOINPUT/CONTENT',
            );
          }
        },
        initialize: () =>
          set(
            () => ({ form: { title: '', content: '' } }),
            false,
            'TODOINPUT/INITIALIZE',
          ),
      }),
      { name: 'TODOINPUT' },
    ),
  ),
);

export default useTodoInput;
