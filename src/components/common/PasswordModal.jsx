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
    console.log(password);
    return true;
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="주문 확인"
      onRequestClose={() => setOpen(false)} // 함수로 수정
    >
      <div>
        <h2>주문 확인</h2>
        <div>
          <div className="flex">
            <div>주문 수량</div>
            <div>{message.quantity}</div>
          </div>
          <div className="flex">
            <div>총 주문 금액</div>
            <div>{message.price}</div>
          </div>
          <div>{message.type}하시겠습니까?</div>
        </div>

        <div>
          <div>간편 비밀번호</div>
          <div>
            <input
              type="password"
              placeholder="계좌 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setOpen(false)}>취소</button>
          <button
            onClick={() => {
              submitPassword(password);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
