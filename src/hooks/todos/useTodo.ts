import { useState } from 'react';
import shallow from 'zustand/shallow';
import useTodoInputStore from './useTodoInputStore';

export default function useTodo() {
  const { setTitle, setContent, form, initialize } = useTodoInputStore(
    (state) => ({
      setTitle: state.setTitle,
      setContent: state.setContent,
      form: state.form,
      initialize: state.initialize,
    }),
    shallow,
  );

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  return {
    form,
    onInputChange,
    initialize,
    isEditMode,
    setIsEditMode,
    setTitle,
    setContent,
  };
}
