import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { AuthInputForm } from '../../hooks/auth/types';
import {
  useLoginMutation,
  useRegistMutation,
} from '../../hooks/auth/useAuthFetch';
import useAuthInputStore from '../../hooks/auth/useAuthInputStore';
import useAuthStore from '../../hooks/auth/useAuthStore';
import { verifyEmail } from '../../lib/function/verify';
import Button from '../base/Button';

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

const AuthForm = () => {
  const { setType, type } = useAuthStore();
  const {
    form: authInputForm,
    onInputChange: onAuthInputForm,
    initialize,
  } = useAuthInputStore(
    (state) => ({
      form: state.form,
      initialize: state.initialize,
      onInputChange: state.onInputChange,
    }),
    shallow,
  );
  const { mutate: login } = useLoginMutation();
  const { mutate: regist } = useRegistMutation();

  const loginValidate = ({
    id,
    password,
  }: Omit<AuthInputForm, 'passwordConfirm'>) => {
    if (id === '' || password === '') {
      return alert('아이디와 비밀번호를 입력하세요.');
    }
    if (verifyEmail(id) === false) {
      return alert('이메일 형식이 아닙니다.');
    }
    if (password.length < 8) {
      return alert('비밀번호는 8자리 이상이여야 합니다.');
    }
  };
  const registValidate = ({ id, password, passwordConfirm }: AuthInputForm) => {
    loginValidate({ id, password });
    if (password !== passwordConfirm) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
  };
  return (
    <AuthFormBlock>
      <h3>{type === 'LOGIN' ? '로그인' : '회원가입'}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (type === 'LOGIN') {
            loginValidate({
              id: authInputForm.id,
              password: authInputForm.password,
            });
            login({ id: authInputForm.id, password: authInputForm.password });
          } else {
            registValidate({ ...authInputForm });
            regist({ ...authInputForm });
          }
        }}
      >
        <StyledInput
          type="email"
          placeholder="아이디"
          value={authInputForm.id}
          name="id"
          onChange={onAuthInputForm}
        />
        <StyledInput
          type="password"
          placeholder="비밀번호"
          name="password"
          value={authInputForm.password}
          onChange={onAuthInputForm}
        />
        {type === 'REGIST' && (
          <StyledInput
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            value={authInputForm.passwordConfirm}
            onChange={onAuthInputForm}
          />
        )}
        <ButtonWithMarginTop
          disabled={false}
          type={'submit'}
          fullWidth
          className="button-with-margin-top"
        >
          {type === 'LOGIN' ? '로그인' : '회원가입'}
        </ButtonWithMarginTop>
      </form>
      <Footer
        onClick={() => {
          setType();
          initialize();
        }}
      >
        {type !== 'LOGIN' ? '로그인' : '회원가입'}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
