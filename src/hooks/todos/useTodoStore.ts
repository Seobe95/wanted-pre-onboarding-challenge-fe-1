import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TodoStoreState {
  isEditMode: boolean;
  setIsEditMode: () => void;
}

const useTodoStore = create<TodoStoreState>()(
  devtools(
    persist(
      (set) => ({
        isEditMode: false,
        setIsEditMode: () => {
          set(
            (state) => ({ isEditMode: !state.isEditMode }),
            false,
            'TODO/IS_EDIT_MODE',
          );
        },
      }),
      { name: 'TODO' },
    ),
  ),
);

export default useTodoStore;
