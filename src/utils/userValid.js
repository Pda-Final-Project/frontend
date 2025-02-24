const validatePhoneNumber = (phone) => {
  // 숫자만 10~11자리 허용
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};
const validatePassword = (password) => {
  // 최소 8자, 하나 이상의 문자, 숫자, 특수문자를 포함해야 함
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const validateName = (accountName) => {
  //영문, 한글, 숫자 2-10자리 허용
  const nameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;
  return nameRegex.test(accountName);
};

const validateAccountPassword = (accountPassword) => {
  //숫자만 6자리 허용
  const passwordRegex = /^\d{6}$/;
  return passwordRegex.test(accountPassword);
};

export {
  validatePassword,
  validatePhoneNumber,
  validateName,
  validateAccountPassword,
};
