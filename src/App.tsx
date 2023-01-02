import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import AuthPage from "./pages/AuthPage";
import TodoListDetailPage from "./pages/TodoListDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoListPage />}>
        <Route path="/:id" element={<TodoListDetailPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
