import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../lib/api/client';
import { TodoFetchResult, TodoInputForm } from './types';
import useTodoInputStore from './useTodoInputStore';

interface CreateTodoPrameterType extends TodoInputForm {
  token: string;
}

interface EditTodoPrameterType extends CreateTodoPrameterType {
  id: string;
}

export const useCreateTodoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<TodoFetchResult, AxiosError, CreateTodoPrameterType>(
    async ({ title, content, token }: CreateTodoPrameterType) => {
      const response = await client.post<
        TodoInputForm,
        { data: TodoFetchResult }
      >(
        '/todos',
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries('GET_TODO_LIST');
      },
    },
  );
};

export const useGetTodoQuery = ({ token }: { token: string }) => {
  return useQuery<
    { data: { data: TodoFetchResult[] } },
    AxiosError,
    { data: TodoFetchResult[] }
  >(
    ['GET_TODO_LIST', token],
    async (token): Promise<{ data: { data: TodoFetchResult[] } }> => {
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
};

const fetchTodo = async (
  token: string,
  id: string,
): Promise<TodoFetchResult> => {
  const response = await client.get(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data.data;
};
export const useGetTodoByIdQuery = ({
  token,
  id = '',
}: {
  token: string;
  id: string;
}) => {
  return useQuery(
    ['GET_TODO_LIST_BY_ID', { token: token, id: id }],
    () => fetchTodo(token, id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TodoFetchResult, AxiosError, EditTodoPrameterType>(
    async ({ title, content, id, token }) => {
      const response = await client.put<{ data: TodoFetchResult }>(
        `/todos/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('GET_TODO_LIST');
        queryClient.invalidateQueries('GET_TODO_LIST_BY_ID');
      },
    },
  );
};

export const useDeleteTodoMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialize = useTodoInputStore((state) => state.initialize);
  return useMutation<
    TodoFetchResult,
    AxiosError,
    { id: string; token: string }
  >(
    async ({ id, token }) => {
      const response = await client.delete<{ data: TodoFetchResult }>(
        `/todos/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('GET_TODO_LIST');
        initialize();
        navigate('/', {
          replace: true,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );
};
