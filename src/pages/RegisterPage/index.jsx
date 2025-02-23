import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRegisterInfoValid } from "./checkRegisterInfo";
import { register } from "../../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    userName: "",
    userPhone: "",
    userPassword: "",
    accountPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e, field) => {
    setRegisterInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRegister = () => {
    if (isRegisterInfoValid(registerInfo, setError)) {
      tryRegister(registerInfo);
      setError("");
    }
  };

  const tryRegister = async (registerInfo) => {
    try {
      const response = await register(registerInfo);
      if (response.data.status === "CREATED") {
        alert(response.data.data);
        navigate("../login");
      }
    } catch (error) {
      alert("회원가입에 실패했습니다...");
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-white flex flex-col">
        <img
          src="../../../public/images/logo.png"
          className="w-48 cursor-pointer"
          onClick={() => navigate("../")}
        />
        <img
          src="../../../public/images/login.jpg"
          className="h-auto w-2xl absolute left-0 bottom-0"
        />
      </div>
      <div className="bg-blue-md h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg flex flex-col items-center p-24 w-full max-w-md space-y-12 shadow-xl">
          <h1 className="font-bold text-3xl">FinPago 함께하기</h1>
          <div className="flex flex-col space-y-4 w-full">
            <div>
              <input
                type="text"
                placeholder="이름"
                value={registerInfo.userName}
                onChange={(e) => handleChange(e, "userName")}
                className="input-style"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="전화번호"
                value={registerInfo.userPhone}
                onChange={(e) => handleChange(e, "userPhone")}
                className="input-style"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="비밀번호"
                value={registerInfo.userPassword}
                onChange={(e) => handleChange(e, "userPassword")}
                className="input-style"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="계좌 비밀번호"
                value={registerInfo.accountPassword}
                onChange={(e) => handleChange(e, "accountPassword")}
                className="input-style"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </div>

          <button onClick={handleRegister} className="button-style">
            회원가입
          </button>

          {/* 회원가입 버튼 */}
          <div
            onClick={() => navigate("../login")}
            className="text-sm hover:underline cursor-pointer"
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}
