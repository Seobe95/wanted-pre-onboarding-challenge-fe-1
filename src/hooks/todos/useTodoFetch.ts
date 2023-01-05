import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../lib/api/client';
import { TodoFetchResult, TodoInputForm } from './types';
import useTodoStore from './useTodoStore';
import useTodoInputStore from './useTodoStore';

interface CreateTodoPrameterType extends TodoInputForm {
  token: string;
}

interface EditTodoPrameterType extends CreateTodoPrameterType {
  id: string;
}

export const useCreateTodoQuery = () => {
  const queryClient = useQueryClient();
  const initialize = useTodoStore((state) => state.initialize);
  return useMutation<TodoFetchResult, AxiosError, CreateTodoPrameterType>(
    async ({ title, content, token }: CreateTodoPrameterType) => {
      const response = await client.post<
        TodoFetchResult,
        { data: TodoFetchResult },
        TodoInputForm
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
      onSuccess: () => {
        queryClient.invalidateQueries('GET_TODO_LIST');
        initialize();
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );
};

export const useGetTodoQuery = ({ token }: { token: string }) => {
  return useQuery<{ data: TodoFetchResult[] }, AxiosError, TodoFetchResult[]>(
    ['GET_TODO_LIST', token],
    async (token): Promise<{ data: TodoFetchResult[] }> => {
      const response = await client.get<{ data: { data: TodoFetchResult[] } }>(
        '/todos',
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: (data) => {},
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
  const response = await client.get<{ data: TodoFetchResult }>(`/todos/${id}`, {
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
  return useQuery<TodoFetchResult, AxiosError, TodoFetchResult>(
    ['GET_TODO_LIST_BY_ID', { token: token, id: id }],
    () => fetchTodo(token, id),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.error(error);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
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
      onSuccess: () => {
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
      onSuccess: () => {
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
