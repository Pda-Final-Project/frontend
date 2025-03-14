import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRegisterInfoValid } from "./checkRegisterInfo";
import { register } from "../../api/authApi";
import { toast } from "react-toastify";

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
        toast.info("😀 회원가입에 성공했습니다!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: "#54b0fe", // 원하는 배경색 (예: 초록색)
            color: "#eee", // 텍스트 색상
            fontWeight: "bold", // 글자 굵기
            fontSize: "14px", // 글자 크기
          },
        });
        navigate("../login");
      }
    } catch (error) {
      toast.error("😣 회원가입에 실패했습니다.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          color: "#eee", // 텍스트 색상
          fontWeight: "bold", // 글자 굵기
          fontSize: "14px", // 글자 크기
        },
      });
      console.error(error.message);
    }
  };
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-white flex flex-col">
        <img
          src="/images/logo.png"
          className="w-40 cursor-pointer"
          onClick={() => navigate("../")}
        />
        <img
          src="/images/login.jpg"
          className="h-auto w-lg absolute left-0 bottom-0"
        />
      </div>
      <div className="bg-blue-md h-screen flex items-center justify-center">
        <div
          className={`bg-white rounded-lg flex flex-col items-center p-24 w-full max-w-md space-y-12 shadow-xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="font-bold text-2xl">FinPago 함께하기</h1>
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
                placeholder="전화번호 (숫자만 입력)"
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
                placeholder="간편 인증번호 (6자리)"
                value={registerInfo.accountPassword}
                onChange={(e) => handleChange(e, "accountPassword")}
                className="input-style"
              />
            </div>

            {error && (
              <div className="text-red-md text-sm text-center">{error}</div>
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
