import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import client from '../../lib/api/client';
import { setLocalstorage } from '../../lib/function/localstorage';
import { AuthFetchResult, AuthInputForm } from './types';
import { verifyEmail } from '../../lib/function/verify';
import useAuthStore from './useAuthStore';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

/** 로그인시 사용하는 비동기 작업을 관리하는 hook */
export function useLoginMutation(): UseMutationResult<
  AuthFetchResult,
  AxiosError,
  AuthInputForm
> {
  const { setToken, initialize } = useAuthStore(
    (state) => ({ setToken: state.setToken, initialize: state.initialize }),
    shallow,
  );

  const navigate = useNavigate();
  return useMutation(
    async (params) => {
      if (params.id === '' || params.password === '') {
        return alert('아이디와 비밀번호를 입력하세요.');
      }
      if (verifyEmail(params.id) === false) {
        return alert('이메일 형식이 아닙니다.');
      }
      if (params.password.length < 8) {
        return alert('비밀번호는 8자리 이상이여야 합니다.');
      }
      const response = await client.post('/users/login', {
        email: params.id,
        password: params.password,
      });
      return response.data;
    },
    {
      mutationKey: 'LOGIN',
      onSuccess(e) {
        setToken(e.token);
        setLocalstorage(e.token);
        initialize();
        navigate('/', { replace: true });
        // window.location.href = '/';
      },
      onError(error) {
        alert('로그인에 실패하였습니다.');
      },
    },
  );
}

export function useRegistMutation(): UseMutationResult<
  AuthFetchResult,
  AxiosError,
  AuthInputForm
> {
  const { setToken, initialize } = useAuthStore(
    (state) => ({ setToken: state.setToken, initialize: state.initialize }),
    shallow,
  );
  const navigate = useNavigate();
  return useMutation(
    async (params) => {
      if (
        params.id === '' ||
        params.password === '' ||
        params.passwordConfirm === ''
      ) {
        return alert('아이디와 비밀번호를 입력하세요.');
      }
      if (verifyEmail(params.id) === false) {
        return alert('이메일 형식이 아닙니다.');
      }
      if (params.password !== params.passwordConfirm) {
        return alert('비밀번호가 일치하지 않습니다.');
      }
      if (params.password.length < 8) {
        return alert('비밀번호는 8자리 이상이여야 합니다.');
      }
      const response = await client.post('/users/create', {
        email: params.id,
        password: params.password,
      });
      return response.data;
    },
    {
      mutationKey: 'REGIST',
      onSuccess(e) {
        setLocalstorage(e.token);
        setToken(e.token);
        initialize();
        navigate('/', { replace: true });
      },
      onError(error) {
        alert('로그인에 실패하였습니다.');
      },
    },
  );
}
