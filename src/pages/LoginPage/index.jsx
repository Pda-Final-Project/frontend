import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../../utils/userValid";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("전화번호는 10~11자리 숫자입니다.");
      return;
    }
    if (!validatePassword(password)) {
      setError("비밀번호는 6자 이상의 영문, 숫자 조합이어야 합니다.");
      return;
    }
    setError("");

    // 로그인 처리
    console.log("로그인 시도", phoneNumber, password);
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
