import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

/** 로그인 & 회원가입 화면 페이지 - 로그인 및 회원가입 화면 분기 완료 */
const AuthPage = () => {
  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
  );
};

export default AuthPage;
