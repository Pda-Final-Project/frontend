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
      `/api/sse/subscribe`,
      eventHandlers,
      token
    );
  }

  return;
}
