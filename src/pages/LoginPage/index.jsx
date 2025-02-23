import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../../utils/userValid";
import { login } from "../../api/authApi";

export default function Index() {
  const [loginData, setLoginData] = useState({
    userPhone: "",
    userPassword: "",
  });

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
    tryLogin();
  };

  const checkLogin = () => {
    if (!validatePhoneNumber(loginData.userPhone)) {
      return "전화번호는 10~11자리 숫자입니다.";
    }
    if (!validatePassword(loginData.userPassword)) {
      return "비밀번호는 최소 8자, 하나 이상의 문자, 숫자, 특수문자를 포함해야 합니다.";
    }
    return null; // 유효성 통과
  };

  //login api 호출
  const tryLogin = async () => {
    try {
      const response = await login(loginData);
      if (response.data.status === "OK") {
        sessionStorage.setItem("accessToken", response.data.data);
        alert(response.data.message);
        navigate("../");
      }
    } catch (error) {
      alert("로그인에 실패했습니다...");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-200 flex flex-col items-center p-4 w-full max-w-md">
        <h1>Finpago 시작하기</h1>

        {/* 전화번호 입력 */}
        <input
          placeholder="전화번호"
          value={loginData.userPhone}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, userPhone: e.target.value }))
          }
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={loginData.userPassword}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, userPassword: e.target.value }))
          }
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
