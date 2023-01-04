import styled from 'styled-components';
import {
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from '../../hooks/todos/useFetchTodo';
import useAuthStore from '../../hooks/auth/useAuthStore';
import Button from '../base/Button';
import useTodo from '../../hooks/todos/useTodo';
import useTodoInputStore from '../../hooks/todos/useTodoInputStore';
import shallow from 'zustand/shallow';
import { useEffect } from 'react';

interface TodoDetailProps {
  id: string;
}

const TodoDetailBlock = styled.div`
  background: white;
  padding: 2rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  border-radius: 15px;

  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0;
  }
  p {
    margin-top: 2rem;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  font-size: 2rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 0.5rem;
  outline: none;
  &:focus {
    color: #333333;
    border-bottom: 1px solid #acaaaa;
  }
`;

const StyledInputContent = styled(StyledInput)`
  font-size: 1rem;
  margin-top: 1.75rem;
  font-weight: 100;
  width: 100%;
`;

const MarginRightWithButton = styled(Button)`
  margin-right: 1rem;
`;

const TodoDetail = ({ id }: TodoDetailProps) => {
  const token = useAuthStore((state) => state.token);
  const { data } = useGetTodoByIdQuery({ token, id });
  const { mutate: update } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const {
    form,
    initialize,
    onInputChange,
    isEditMode,
    setIsEditMode,
    setTitle,
    setContent,
  } = useTodo();

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setContent(data?.content);
    }
  }, [data, setTitle, setContent, isEditMode]);

  if (data === undefined) {
    return <p>에러가 발생하였습니다.</p>;
  }
  if (isEditMode) {
    return (
      <TodoDetailBlock>
        <StyledTitle>
          <StyledInput
            value={form.title}
            onChange={onInputChange}
            name="title"
          />
          <div>
            <MarginRightWithButton
              fullWidth={false}
              onClick={() => {
                update({ id, title: form.title, content: form.content, token });
                setIsEditMode((prev) => !prev);
              }}
            >
              수정 완료
            </MarginRightWithButton>
            <Button
              fullWidth={false}
              onClick={() => {
                initialize();
                setIsEditMode((prev) => !prev);
              }}
            >
              수정 취소
            </Button>
          </div>
        </StyledTitle>
        <StyledInputContent
          value={form.content}
          onChange={onInputChange}
          name="content"
        />
      </TodoDetailBlock>
    );
  }
  return (
    <TodoDetailBlock>
      <StyledTitle>
        <h2>{data?.title}</h2>
        <div>
          <MarginRightWithButton
            fullWidth={false}
            onClick={() => {
              setIsEditMode((prev) => !prev);
            }}
          >
            수정
          </MarginRightWithButton>
          <Button
            fullWidth={false}
            onClick={() => {
              deleteTodo({ id, token });
            }}
          >
            삭제
          </Button>
        </div>
      </StyledTitle>
      <p>{data?.content}</p>
    </TodoDetailBlock>
  );
};

export default TodoDetail;
