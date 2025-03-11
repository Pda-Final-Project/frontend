import React, { useState } from "react";
import ReactModal from "react-modal";
import { validateAccountPassword } from "../../utils/userValid";

ReactModal.setAppElement("#root");

export default function PasswordModal({ message, action, isOpen, setOpen }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitPassword = async () => {
    setError(""); // 기존 에러 메시지 초기화

    // 1. 비밀번호 유효성 검사
    if (!validateAccountPassword(password)) {
      setError("계좌 비밀번호는 6자리 숫자입니다.");
      setPassword("");
      return;
    }

    // 2. 비밀번호 일치 검사
    const match = await isPasswordMatch(password);
    if (!match) {
      setError("비밀번호가 일치하지 않습니다.");
      setPassword("");
      return;
    }

    // 3. 비밀번호 일치 시 주문 체결 (action 실행 후 모달 닫기)
    setPassword("");
    action();
    setOpen(false);
  };

  // 비밀번호 일치 여부 체크 함수
  const isPasswordMatch = async (password) => {
    // try {
    //   const response = await checkAccountPassword(password);
    //   return response.status === "success";
    // } catch (error) {
    //   setError(error.message);
    //   return false;
    // }
    return true;
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="주문 확인"
      onRequestClose={() => setOpen(false)} // 함수로 수정
      className="fixed inset-0 flex items-center justify-center z-100"
      overlayClassName="fixed inset-0 z-[150] backdrop-blur-lg"
    >
      <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-12 flex flex-col z-200 shadow-md">
        <h2 className="text-xl font-semibold">주문 확인</h2>
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="font-semibold">주문 수량</div>
            <div>{message.quantity}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="font-semibold">총 주문 금액</div>
            <div>{message.price}</div>
          </div>
          <div className="text-center font-semibold text-blue-md mt-4">
            {message.type}하시겠습니까?
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">간편 비밀번호</label>
          <input
            type="password"
            placeholder="계좌 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
          />
          {error && <div className="text-red-md text-sm mt-2">{error}</div>}
        </div>

        <div className="flex justify-between mt-4 gap-40">
          <button
            onClick={() => setOpen(false)}
            className="white-button-style w-full"
          >
            취소
          </button>
          <button
            onClick={() => {
              submitPassword(password);
            }}
            className="button-style w-full"
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
