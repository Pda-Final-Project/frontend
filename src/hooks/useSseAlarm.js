import useSse from "./useSse";
import { toast } from "react-toastify";
export default function useSseAlarm() {
  const token = sessionStorage.getItem("accessToken");

  const eventHandlers = {
    notification: (data) => {
      toast(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  };
  if (token) {
    const { isConnected, error } = useSse(
      `${import.meta.env.VITE_API_USER_URL}/sse/subscribe`,
      eventHandlers,
      token // token을 전달
    );
  }

  return;
}
