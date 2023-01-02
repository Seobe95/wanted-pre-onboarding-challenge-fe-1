import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import useAuth from "../hooks/auth/useAuth";

const AuthPage = () => {
  const { form, authType, onInputChange, onAuthTypeChange, login, regist } =
    useAuth();

  return (
    <AuthTemplate>
      <AuthForm
        type={authType}
        form={form}
        onInputChange={onInputChange}
        onAuthTypeChange={onAuthTypeChange}
        login={login}
        regist={regist}
      />
    </AuthTemplate>
  );
};

export default AuthPage;
