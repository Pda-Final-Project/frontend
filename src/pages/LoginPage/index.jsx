import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "../../utils/userValid";
import { login } from "../../api/authApi";
import { toast } from "react-toastify";

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
      return "비밀번호는 최소 8자, 하나 이상의 문자, 숫자, 특수문자(@ $ ! % * ? &)를 포함해야 합니다.";
    }
    return null; // 유효성 통과
  };

  //login api 호출
  const tryLogin = async () => {
    try {
      const response = await login(loginData);
      if (response.data.status === "OK") {
        sessionStorage.setItem("accessToken", response.data.data);
        toast("😀 로그인에 성공했습니다!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("../");
      }
    } catch (error) {
      toast("😣 로그인에 실패했습니다.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-white flex flex-col">
        <img
          src="/images/logo.png"
          className="w-40 cursor-pointer"
          onClick={() => navigate("../")}
        />
        <img
          src="../../../public/images/login.jpg"
          className="h-auto w-lg absolute left-0 bottom-0"
        />
      </div>
      <div className="bg-blue-md h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg flex flex-col items-center p-24 w-full max-w-md space-y-12 shadow-xl">
          <h1 className="font-bold text-2xl mb-5">FinPago 시작하기</h1>
          <span className="text-blue-md text-sm mb-1 font-semibold">
            실시간 해외 공시 번역·요약부터 매매까지,
          </span>
          <span className="text-blue-md text-sm mb-10 font-semibold">
            {" "}
            지금 만나보세요!
          </span>
          <div className="flex flex-col space-y-4 w-full">
            {/* 전화번호 입력 */}
            <input
              placeholder="전화번호"
              value={loginData.userPhone}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, userPhone: e.target.value }))
              }
              className="input-style"
            />

            {/* 비밀번호 입력 */}
            <input
              type="password"
              placeholder="비밀번호"
              value={loginData.userPassword}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  userPassword: e.target.value,
                }))
              }
              className="input-style"
            />
            {/* 에러 메시지 */}
            {error && (
              <div className="text-red-md text-center text-sm">{error}</div>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button onClick={handleLogin} className="button-style">
            로그인
          </button>

          {/* 회원가입 버튼 */}
          <div
            onClick={() => navigate("../register")}
            className="text-sm hover:underline cursor-pointer"
          >
            회원가입하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}
