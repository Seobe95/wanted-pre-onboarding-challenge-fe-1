import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../hooks/auth/useAuthStore';
import { useCreateTodoQuery } from '../../hooks/todos/useTodoFetch';
import useTodoInputStore from '../../hooks/todos/useTodoInputStore';
import Button from '../base/Button';

const TodoFormBlock = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: #333333;
    border-bottom: 1px solid #acaaaa;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const StyledInputWithMarginTop = styled(StyledInput)`
  margin-top: 1rem;
`;

const TodoForm = () => {
  const token = useAuthStore((state) => state.token);
  const {
    form: todoInputForm,
    initialize: todoInputInitializeHandler,
    onInputChange: onTodoInputChange,
  } = useTodoInputStore();

  const create = useCreateTodoQuery();

  useEffect(() => {
    todoInputInitializeHandler();
  }, [todoInputInitializeHandler]);

  return (
    <TodoFormBlock>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate({ ...todoInputForm, token });
        }}
      >
        <InputBlock>
          <StyledInput
            placeholder="무얼 해야할까요?"
            value={todoInputForm.title}
            name="title"
            onChange={onTodoInputChange}
          ></StyledInput>
          <StyledInputWithMarginTop
            placeholder="자세한 내용을 적어보세요."
            value={todoInputForm.content}
            name="content"
            onChange={onTodoInputChange}
          ></StyledInputWithMarginTop>
        </InputBlock>
        <Button fullWidth={false}>작성하기</Button>
      </StyledForm>
    </TodoFormBlock>
  );
};

export default TodoForm;
