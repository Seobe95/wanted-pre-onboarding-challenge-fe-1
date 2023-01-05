import { useParams } from 'react-router-dom';
import Header from '../components/base/Header';
import TodoDetail from '../components/todolist/TodoDetail';
import TodoForm from '../components/todolist/TodoForm';
import TodoList from '../components/todolist/TodoList';
import TodoListTemplate from '../components/todolist/TodoListTemplate';

const TodoListPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <TodoListTemplate>
        {id ? <TodoDetail id={id} /> : <TodoForm />}
        <TodoList />
      </TodoListTemplate>
    </>
  );
};

export default TodoListPage;
