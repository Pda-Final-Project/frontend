import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function CheckModal({
  title,
  message,
  action,
  isOpen,
  setOpen,
}) {
  // 모달이 열리는 상태를 관리하는 prop인 `isOpen`과 `closeModal`을 부모 컴포넌트에서 받습니다.

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={title}
      onRequestClose={() => setOpen(false)} // 함수로 수정
    >
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
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
