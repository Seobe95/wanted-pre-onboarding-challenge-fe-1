import styled from 'styled-components';
import Responsive from '../base/Responsive';

export interface TodoListTemplateProps {
  children: React.ReactNode;
}

const TodoListTemplateBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const TodoListTemplate = ({ children }: TodoListTemplateProps) => {
  return <TodoListTemplateBlock>{children}</TodoListTemplateBlock>;
};

export default TodoListTemplate;
