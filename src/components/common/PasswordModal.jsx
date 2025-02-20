import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function PasswordModal({ message, action, isOpen, setOpen }) {
  // 모달이 열리는 상태를 관리하는 prop인 `isOpen`과 `closeModal`을 부모 컴포넌트에서 받습니다.
  const [password, setPassword] = useState("");

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
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setOpen(false)}>취소</button>
          <button
            onClick={() => {
              action(); // action 함수 호출
              setOpen(false); // 모달 닫기
            }}
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
