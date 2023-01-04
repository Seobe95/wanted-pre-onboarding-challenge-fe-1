import { useCallback, useState } from 'react';
import { deleteLocalStorage } from '../../lib/function/localstorage';
import { AuthInputForm } from './types';

/** 로그인 & 회원가입시 상태를 관리하는 hook */
export default function useAuthInput() {
  const [form, setForm] = useState<AuthInputForm>({
    id: '',
    password: '',
    passwordConfirm: '',
  });
  const [authType, setAuthType] = useState<'login' | 'regist'>('login');
  /** 로그인 & 회원가입 시 입력하는 값을 업데이트합니다. */
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      if (name === 'id') {
        setForm({ ...form, id: value });
      } else if (name === 'password') {
        setForm({ ...form, password: value });
      } else if (name === 'passwordConfirm') {
        setForm({ ...form, passwordConfirm: value });
      }
    },
    [form],
  );

  /** 입력값들을 초기화합니다. */
  const initialize = () => {
    setForm({ id: '', password: '', passwordConfirm: '' });
  };

  /** 로그인 & 회원가입 화면을 분기합니다. */
  const onAuthTypeChange = (type: 'login' | 'regist') => {
    if (type === 'login') {
      setAuthType('regist');
    } else {
      setAuthType('login');
    }
    initialize();
  };

  const logout = (key: string) => {
    deleteLocalStorage(key);
  };

  return {
    form,
    authType,
    onInputChange,
    onAuthTypeChange,
    logout,
  };
}
