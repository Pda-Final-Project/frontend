import useSse from "./useSse";
import { toast } from "react-toastify";
export default function useSseAlarm() {
  const token = sessionStorage.getItem("accessToken");

  const eventHandlers = {
    notification: (data) => {
      toast.info(data, {
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
    },
  };
  if (token) {
    const { isConnected, error } = useSse(
      `/api/sse/subscribe`,
      eventHandlers,
      token
    );
  }

  return;
}
