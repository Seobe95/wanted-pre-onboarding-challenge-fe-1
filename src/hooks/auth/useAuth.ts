import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../lib/function/localstorage';
import { AuthInputForm } from './types';

/** 로그인 & 회원가입시 상태를 관리하는 hook */
export default function useAuth() {
  const [form, setForm] = useState<AuthInputForm>({
    id: '',
    password: '',
    passwordConfirm: '',
  });
  const [authType, setAuthType] = useState<'login' | 'regist'>('login');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorage('token');
    if (token !== null) {
      navigate('/');
    }
  }, [navigate]);

  /** 로그인 & 회원가입 시 입력하는 값을 업데이트합니다. */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'id') {
      setForm({ ...form, id: e.target.value });
    } else if (e.target.id === 'password') {
      setForm({ ...form, password: e.target.value });
    } else if (e.target.id === 'passwordConfirm') {
      setForm({ ...form, passwordConfirm: e.target.value });
    }
  };

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

  return {
    form,
    authType,
    onInputChange,
    onAuthTypeChange,
  };
}
