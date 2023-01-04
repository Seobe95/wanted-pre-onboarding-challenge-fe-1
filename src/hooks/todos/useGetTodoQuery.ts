import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import client from '../../lib/api/client';
import { TodoFetchResult } from './types';

export default function useGetTodoQuery(token: string) {
  return useQuery<
    { data: { data: TodoFetchResult[] } },
    AxiosError,
    { data: TodoFetchResult[] },
    string[]
  >(
    ['GET_TODO_LIST', token],
    async (token) => {
      const response = await client.get('/todos', {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
}
