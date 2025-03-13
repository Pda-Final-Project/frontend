import React, { useState } from "react";
import ReactModal from "react-modal";
import { validateAccountPassword } from "../../utils/userValid";
import { checkAccountPassword } from "../../api/authApi";
ReactModal.setAppElement("#root"); // 접근성을 위해 추가

export default function PasswordModal({ isOpen, onClose, action }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitPassword = async () => {
    setError(""); // 오류 초기화

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

    // 3. 성공 시
    setPassword("");
    action(); // 인증 상태 업데이트
  };

  const isPasswordMatch = async (password) => {
    try {
      const response = await checkAccountPassword(password);
      if (response.data.status == "OK") {
        alert("인증에 성공했습니다!");
        return true;
      }
    } catch (error) {
      console.error("비밀번호 검사 오류:", error.message);
      return false;
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="주문 확인"
      className="fixed inset-0 flex items-center justify-center z-100"
      overlayClassName="fixed inset-0 z-[150] backdrop-blur-lg"
    >
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">비밀번호 확인</h2>

        <input
          type="password"
          placeholder="계좌 비밀번호 (6자리)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-style mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onClose()}
            className="white-button-style w-full"
          >
            취소
          </button>
          <button onClick={submitPassword} className="button-style w-full">
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
