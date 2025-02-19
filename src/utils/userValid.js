const validatePhoneNumber = (phone) => {
  // 숫자만 10~11자리 허용
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};
const validatePassword = (password) => {
  // 영문자와 숫자가 1개 이상 포함되어야 하고, 길이는 6자 이상 허용용
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};

const validateAccountNumber = (accountNumber) => {
  //숫자만 6-14자리 허용
  const accountRegex = /^[0-9\-]{6,14}$/;
  return accountRegex.test(accountNumber);
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
  validateAccountNumber,
  validateAccountPassword,
};
