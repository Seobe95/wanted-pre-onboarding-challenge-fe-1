import styled from 'styled-components';
import { AuthInputForm } from '../../hooks/auth/types';
import Button from '../base/Button';

interface AuthFormProps {
  type: 'login' | 'regist';
  form: AuthInputForm;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthTypeChange: (e: 'login' | 'regist') => void;
  login: () => void;
  regist: () => void;
}

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  cursor: pointer;
  color: #eac9c1;

  &:hover {
    color: #d3ab9e;
  }
`;

const AuthForm = ({
  type = 'login',
  form,
  onInputChange,
  onAuthTypeChange,
  login,
  regist,
}: AuthFormProps) => {
  return (
    <AuthFormBlock>
      <h3>{type === 'login' ? '로그인' : '회원가입'}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (type === 'login') {
            login();
          } else {
            regist();
          }
        }}
      >
        <StyledInput
          type="email"
          placeholder="아이디"
          value={form.id}
          name="id"
          onChange={onInputChange}
        />
        <StyledInput
          type="password"
          placeholder="비밀번호"
          name="password"
          value={form.password}
          onChange={onInputChange}
        />
        {type === 'regist' && (
          <StyledInput
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={onInputChange}
          />
        )}
        <ButtonWithMarginTop
          disabled={false}
          type={'submit'}
          fullWidth
          className="button-with-margin-top"
        >
          {type === 'login' ? '로그인' : '회원가입'}
        </ButtonWithMarginTop>
      </form>
      <Footer onClick={() => onAuthTypeChange(type)}>
        {type !== 'login' ? '로그인' : '회원가입'}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
