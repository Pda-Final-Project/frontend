import {
  validatePassword,
  validatePhoneNumber,
  validateName,
  validateAccountNumber,
  validateAccountPassword,
} from "../../utils/userValid";

export const isRegisterInfoValid = (registerInfo, setError) => {
  const { user, account } = registerInfo;

  // 사용자 정보 유효성 검사
  if (!validateName(user.name)) {
    setError("이름은 2-10자이어야 합니다.");
    return false;
  }
  if (!validatePhoneNumber(user.phoneNumber)) {
    setError("전화번호는 10~11자리 숫자입니다.");
    return false;
  }
  if (!validatePassword(user.password)) {
    setError("비밀번호는 6자 이상의 영문, 숫자 조합이어야 합니다.");
    return false;
  }

  // 계좌 정보 유효성 검사
  if (!validateName(account.name)) {
    setError("계좌명은 2-10자이어야 합니다.");
    return false;
  }
  if (!validateAccountNumber(account.number)) {
    setError("계좌번호는 6-14자리의 숫자입니다.");
    return false;
  }
  if (!validateAccountPassword(account.password)) {
    setError("계좌 비밀번호는 6자의 숫자입니다.");
    return false;
  }

  return true;
};
