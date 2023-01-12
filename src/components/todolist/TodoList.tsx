import { Link } from 'react-router-dom';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import useAuthStore from '../../hooks/auth/useAuthStore';
import { TodoFetchResult } from '../../hooks/todos/types';
import { useGetTodoQuery } from '../../hooks/todos/useTodoFetch';
import useTodoInput from '../../hooks/todos/useTodoInputStore';
import useTodoStore from '../../hooks/todos/useTodoStore';
import Responsive from '../base/Responsive';

interface TodoItemProps {
  item: TodoFetchResult;
}

const TodoListBlock = styled(Responsive)`
  margin-top: 3rem;
  width: 100%;
  padding: 0;
`;

const TodoItemBlock = styled.div`
  background: white;
  padding: 2rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  border-radius: 15px;
  &:first-of-type {
    padding-top: 2rem;
  }
  & + & {
    margin-top: 1rem;
    border-top: 1px solid #e3e3e3;
  }
  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0;
    &:hover {
      color: #e3e3e3;
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const TodoItem = ({ item }: TodoItemProps) => {
  const { id, content, title } = item;
  const { isEditMode, setIsEditMode } = useTodoStore(
    (state) => ({
      isEditMode: state.isEditMode,
      setIsEditMode: state.setIsEditMode,
    }),
    shallow,
  );
  const { initialize } = useTodoInput();
  const onClick = () => {
    if (isEditMode) {
      initialize();
      setIsEditMode();
    }
  };
  return (
    <TodoItemBlock>
      <h2>
        <Link to={`/${id}`} onClick={onClick}>
          {title}
        </Link>
      </h2>
      <p>{content}</p>
    </TodoItemBlock>
  );
};

const TodoList = () => {
  const { token } = useAuthStore();
  const { data: item } = useGetTodoQuery({ token });

  if (item === undefined || item.length === 0) {
    return <p>할 일을 등록하세요.</p>;
  }

  return (
    <TodoListBlock>
      {item.map((item) => {
        return <TodoItem key={item.createdAt} item={item} />;
      })}
    </TodoListBlock>
  );
};

export default TodoList;
