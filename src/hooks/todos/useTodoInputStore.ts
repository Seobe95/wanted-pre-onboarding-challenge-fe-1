import { devtools } from 'zustand/middleware';
import create from 'zustand';
import { TodoInputForm } from './types';

interface TodoInputState {
  form: TodoInputForm;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  initialize: () => void;
}

const useTodoInputStore = create<TodoInputState>()(
  devtools((set) => ({
    form: {
      title: '',
      content: '',
    },
    setTitle: (value) =>
      set(
        (state) => ({
          form: {
            title: value,
            content: state.form.content,
          },
        }),
        false,
        'TODO/title',
      ),
    setContent: (value) =>
      set(
        (state) => ({
          form: {
            title: state.form.title,
            content: value,
          },
        }),
        false,
        'TODO/content',
      ),
    initialize: () => set(() => ({ form: { title: '', content: '' } })),
  })),
);

export default useTodoInputStore;
