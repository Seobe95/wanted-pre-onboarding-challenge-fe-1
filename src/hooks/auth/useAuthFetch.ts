import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import client from '../../lib/api/client';
import { setLocalstorage } from '../../lib/function/localstorage';
import { AuthFetchResult, AuthInputForm } from './types';
import useAuthStore from './useAuthStore';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

/** 로그인시 사용하는 비동기 작업을 관리하는 hook */
export function useLoginMutation() {
  const { setToken } = useAuthStore(
    (state) => ({ setToken: state.setToken }),
    shallow,
  );
  const navigate = useNavigate();
  return useMutation<
    AuthFetchResult,
    AxiosError,
    Omit<AuthInputForm, 'passwordConfirm'>
  >(
    async ({ id, password }): Promise<AuthFetchResult> => {
      const response = await client.post<
        AuthFetchResult,
        { data: AuthFetchResult },
        { email: string; password: string }
      >('/users/login', {
        email: id,
        password: password,
      });
      return response.data;
    },
    {
      mutationKey: 'LOGIN',
      onSuccess(e) {
        setToken(e.token);
        setLocalstorage(e.token);
        navigate('/', { replace: true });
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
  const { setToken } = useAuthStore(
    (state) => ({ setToken: state.setToken }),
    shallow,
  );
  const navigate = useNavigate();
  return useMutation(
    async ({ id, password }) => {
      const response = await client.post<
        AuthFetchResult,
        { data: AuthFetchResult },
        { email: string; password: string }
      >('/users/create', {
        email: id,
        password: password,
      });
      return response.data;
    },
    {
      mutationKey: 'REGIST',
      onSuccess(e) {
        setLocalstorage(e.token);
        setToken(e.token);
        navigate('/', { replace: true });
      },
      onError(error) {
        alert('로그인에 실패하였습니다.');
      },
    },
  );
}
