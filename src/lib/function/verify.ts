/** 이메일의 유효성을 검사합니다. */
export function verifyEmail(userEmail: string) {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (userEmail.match(regExp) != null) {
    return true;
  }
  return false;
}
