import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/base/Header';
import TodoDetail from '../components/todolist/TodoDetail';
import TodoForm from '../components/todolist/TodoForm';
import TodoList from '../components/todolist/TodoList';
import TodoListTemplate from '../components/todolist/TodoListTemplate';
import useAuthStore from '../hooks/auth/useAuthStore';
import { useGetTodoQuery } from '../hooks/todos/useFetchTodo';
import { getLocalStorage } from '../lib/function/localstorage';

const TodoListPage = () => {
  const token = useAuthStore((state) => state.token);
  const get = useGetTodoQuery({ token });
  const { id } = useParams();

  useEffect(() => {
    const item = getLocalStorage('token');
    if (!item || item !== token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/auth';
      return;
    }
  }, [token]);

  if (id !== undefined) {
    return (
      <>
        <Header />
        <TodoListTemplate>
          <TodoDetail id={id} />
          <TodoList item={get.data?.data} />
        </TodoListTemplate>
      </>
    );
  }
  return (
    <>
      <Header />
      <TodoListTemplate>
        <TodoForm />
        <TodoList item={get.data?.data} />
      </TodoListTemplate>
    </>
  );
};

export default TodoListPage;
