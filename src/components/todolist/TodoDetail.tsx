import styled from 'styled-components';
import {
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from '../../hooks/todos/useTodoFetch';
import useAuthStore from '../../hooks/auth/useAuthStore';
import Button from '../base/Button';
import useTodoStore from '../../hooks/todos/useTodoStore';
import { useEffect } from 'react';
import { customConfirm } from '../../lib/function/customConfirm';
import useTodoInput from '../../hooks/todos/useTodoInputStore';
import shallow from 'zustand/shallow';

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
  const { token } = useAuthStore();
  const { data } = useGetTodoByIdQuery({ token, id });
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const { isEditMode, setIsEditMode } = useTodoStore(
    (state) => ({
      isEditMode: state.isEditMode,
      setIsEditMode: state.setIsEditMode,
    }),
    shallow,
  );
  const { todoInputForm, onTodoInputChange, setTodoForm } = useTodoInput(
    (state) => ({
      todoInputForm: state.form,
      onTodoInputChange: state.onInputChange,
      setTodoForm: state.setForm,
    }),
    shallow,
  );

  useEffect(() => {
    if (data && !isEditMode) {
      setTodoForm(data.title, data.content);
    }
    if (data && isEditMode) {
      setTodoForm(todoInputForm.title, todoInputForm.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);
  if (data === undefined) {
    return <p>에러가 발생하였습니다.</p>;
  }
  const title =
    data.title !== todoInputForm.title ? todoInputForm.title : data.title;
  const content =
    data.content !== todoInputForm.content
      ? todoInputForm.content
      : data.content;
  if (isEditMode) {
    return (
      <TodoDetailBlock>
        <StyledTitle>
          <StyledInput
            value={title}
            onChange={onTodoInputChange}
            name="title"
          />
          <div>
            <MarginRightWithButton
              fullWidth={false}
              onClick={() => {
                customConfirm('수정하시겠습니까?', () => {
                  updateTodo({
                    id,
                    title: todoInputForm.title,
                    content: todoInputForm.content,
                    token,
                  });
                  setIsEditMode();
                });
              }}
            >
              수정 완료
            </MarginRightWithButton>
            <Button
              fullWidth={false}
              onClick={() => {
                customConfirm(
                  '수정을 취소하시면 현재 내용은 사라집니다.',
                  () => {
                    setTodoForm(data.title, data.content);
                    setIsEditMode();
                  },
                );
              }}
            >
              수정 취소
            </Button>
          </div>
        </StyledTitle>
        <StyledInputContent
          value={content}
          onChange={onTodoInputChange}
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
              setIsEditMode();
            }}
          >
            수정
          </MarginRightWithButton>
          <Button
            fullWidth={false}
            onClick={() => {
              customConfirm(
                '삭제된 데이터는 복구되지 않습니다. 삭제하시겠습니까?',
                () => {
                  deleteTodo({ id, token });
                },
              );
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
