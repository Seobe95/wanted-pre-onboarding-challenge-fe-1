import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import useAuth from '../hooks/auth/useAuth';
import useLoginMutation from '../hooks/auth/useLoginMutation';
import useRegistMutation from '../hooks/auth/useRegistMutation';

/** 로그인 & 회원가입 화면 페이지 - 로그인 및 회원가입 화면 분기 완료 */
const AuthPage = () => {
  const { form, authType, onInputChange, onAuthTypeChange } = useAuth();
  const loginMutation = useLoginMutation();
  const registMutation = useRegistMutation();

  return (
    <AuthTemplate>
      <AuthForm
        type={authType}
        form={form}
        onInputChange={onInputChange}
        onAuthTypeChange={onAuthTypeChange}
        login={() => {
          loginMutation.mutate(form);
        }}
        regist={() => {
          registMutation.mutate(form);
        }}
      />
    </AuthTemplate>
  );
};

export default AuthPage;
