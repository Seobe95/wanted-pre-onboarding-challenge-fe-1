import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TodoInputForm } from './types';

interface TodoStoreState {
  form: TodoInputForm;
  isEditMode: boolean;
  setIsEditMode: () => void;
  setForm: (title: string, content: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialize: () => void;
}

const useTodoStore = create<TodoStoreState>()(
  devtools(
    persist(
      (set) => ({
        form: {
          title: '',
          content: '',
        },
        isEditMode: false,
        setIsEditMode: () => {
          set(
            (state) => ({ isEditMode: !state.isEditMode }),
            false,
            'TODO/IS_EDIT_MODE',
          );
        },
        setForm: (title, content) => {
          set(() => ({ form: { title, content } }), false, 'TODO/SET_FORM');
        },
        onInputChange: (e) => {
          const { name, value } = e.target;
          if (name === 'title') {
            set(
              (state) => ({
                form: { ...state.form, title: value },
              }),
              false,
              'TODO/TITLE',
            );
          } else if (name === 'content') {
            set(
              (state) => ({
                form: { ...state.form, content: value },
              }),
              false,
              'TODO/CONTENT',
            );
          }
        },
        initialize: () =>
          set(
            () => ({ form: { title: '', content: '' } }),
            false,
            'TODO/INITIALIZE',
          ),
      }),
      { name: 'TODO' },
    ),
  ),
);

export default useTodoStore;
