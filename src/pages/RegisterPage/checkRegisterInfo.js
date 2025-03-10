import {
  validatePassword,
  validatePhoneNumber,
  validateName,
  validateAccountPassword,
} from "../../utils/userValid";

export const isRegisterInfoValid = (registerInfo, setError) => {
  // 사용자 정보 유효성 검사
  if (!validateName(registerInfo.userName)) {
    setError("이름은 2-10자이어야 합니다.");
    return false;
  }
  if (!validatePhoneNumber(registerInfo.userPhone)) {
    setError("전화번호는 10~11자리 숫자입니다.");
    return false;
  }
  if (!validatePassword(registerInfo.userPassword)) {
    setError(
      "비밀번호는 최소 8자, 하나 이상의 문자, 숫자, 특수문자(@ $ ! % * ? &)를 포함해야 합니다."
    );
    return false;
  }

  // 계좌 정보 유효성 검사

  if (!validateAccountPassword(registerInfo.accountPassword)) {
    setError("계좌 비밀번호는 6자의 숫자입니다.");
    return false;
  }

  return true;
};
