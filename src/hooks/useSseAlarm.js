import useSse from "./useSse";

export default function useSseAlarm() {
  const token = sessionStorage.getItem("accessToken");

  const eventHandlers = {
    notification: (data) => {
      console.log("🔔 수신된 알림 데이터:", data);
      alert(data);
    },
  };
  if (token) {
    const { isConnected, error } = useSse(
      `sse/subscribe`,
      eventHandlers,
      token // token을 전달
    );
  }

  return;
}
