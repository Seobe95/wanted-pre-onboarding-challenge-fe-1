/** 로그인 & 회원가입 input 타입값 */
export interface AuthInputForm {
  id: string;
  password: string;
  passwordConfirm: string;
}

/** 로그인 & 회원가입 API 통신 후 Response 타입값 */
export interface AuthFetchResult {
  message: string;
  token: string;
}
