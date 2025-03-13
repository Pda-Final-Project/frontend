import useSse from "./useSse";

export default function useSseAlarm() {
  const token = sessionStorage.getItem("accessToken");
  const eventHandlers = {
    notification: (data) => {
      console.log("🔔 수신된 알림 데이터:", data);
      // TODO: 알림을 상태에 추가하거나 UI에 표시
    },
  };

  const { isConnected, error } = useSse(
    "http://172.16.1.230:19092/v1/api/sse/subscribe",
    eventHandlers,
    token // token을 전달
  );

  return { isConnected, error };
}
