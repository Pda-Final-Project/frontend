import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRegisterInfoValid } from "./checkRegisterInfo";

export default function Register() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    user: { name: "", phoneNumber: "", password: "" },
    account: { name: "", number: "", password: "" },
  });

  const [error, setError] = useState("");

  const handleChange = (e, category, field) => {
    setRegisterInfo((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: e.target.value,
      },
    }));
  };

  const handleRegister = () => {
    if (isRegisterInfoValid(registerInfo, setError)) {
      console.log(registerInfo);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-200 flex flex-col items-center p-4">
        <h1>FinPago 함께하기</h1>

        {/* 사용자 정보 입력 */}
        <h2>사용자 정보</h2>
        <div>
          <input
            type="text"
            placeholder="이름"
            value={registerInfo.user.name}
            onChange={(e) => handleChange(e, "user", "name")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="전화번호"
            value={registerInfo.user.phoneNumber}
            onChange={(e) => handleChange(e, "user", "phoneNumber")}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={registerInfo.user.password}
            onChange={(e) => handleChange(e, "user", "password")}
          />
        </div>

        {/* 계좌 정보 입력 */}
        <h2>계좌 정보</h2>

        <div>
          <input
            type="text"
            placeholder="계좌명"
            value={registerInfo.account.name}
            onChange={(e) => handleChange(e, "account", "name")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="계좌번호"
            value={registerInfo.account.number}
            onChange={(e) => handleChange(e, "account", "number")}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="계좌 비밀번호"
            value={registerInfo.account.password}
            onChange={(e) => handleChange(e, "account", "password")}
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button onClick={handleRegister} className="w-full ">
          회원가입
        </button>

        <div onClick={() => navigate("../login")}>로그인하러 가기</div>
      </div>
    </div>
  );
}
