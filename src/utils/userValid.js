const validatePhoneNumber = (phone) => {
  // 전화번호 유효성 검사 (숫자만 10~11자리 허용)
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};
const validatePassword = (password) => {
  // 영문자와 숫자가 1개 이상 포함되어야 하고, 길이는 6자 이상이어야 함
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};

export { validatePassword, validatePhoneNumber };
