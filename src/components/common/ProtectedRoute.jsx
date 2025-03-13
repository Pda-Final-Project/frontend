import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";

export default function ProtectedRoute({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/"); // 비밀번호 입력 취소 시 홈으로 이동
  };

  const handleConfirm = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  if (isAuthenticated) {
    return children; // 인증되었다면 페이지 렌더링
  }

  return (
    <PasswordModal
      isOpen={isModalOpen}
      onClose={handleClose}
      action={handleConfirm}
    />
  );
}
