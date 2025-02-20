import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../../utils/userValid";
import { login } from "../../api/authApi";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 유효성 검사
    const validationError = checkLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    // tryLogin();
  };

  const checkLogin = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return "전화번호는 10~11자리 숫자입니다.";
    }
    if (!validatePassword(password)) {
      return "비밀번호는 6자 이상의 영문, 숫자 조합이어야 합니다.";
    }
    return null; // 유효성 통과
  };

  //login api 호출
  const tryLogin = async () => {
    try {
      const response = await login(phoneNumber, password);
      if (response.data.status === "success") {
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("../");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-200 flex flex-col items-center p-4 w-full max-w-md">
        <h1>Finpago 시작하기</h1>

        {/* 전화번호 입력 */}
        <input
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 에러 메시지 */}
        {error && <div className="text-red-500">{error}</div>}

        {/* 로그인 버튼 */}
        <button onClick={handleLogin} className=" w-full">
          로그인
        </button>

        {/* 회원가입 버튼 */}
        <div onClick={() => navigate("../register")}>회원가입하러 가기</div>
      </div>
    </div>
  );
}
