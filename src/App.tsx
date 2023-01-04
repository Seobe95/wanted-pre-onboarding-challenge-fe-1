import './App.css';
import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import AuthPage from './pages/AuthPage';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = useRef<QueryClient>();
  if (!queryClient.current) {
    queryClient.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClient.current}>
      <Routes>
        <Route path="/" element={<TodoListPage />}>
          <Route path="/:id" element={<TodoListPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
