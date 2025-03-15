const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  if (dateStr && dateStr.length === 8) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}.${month}.${day}`;
  }
  if (dateStr && dateStr.length === 6) {
    const h = dateStr.slice(0, 2);
    const m = dateStr.slice(2, 4);
    const s = dateStr.slice(4, 6);
    return `${h}:${m}:${s}`;
  }
  if (dateStr.includes(" ")) {
    // "YYYY-MM-DD HH:MM:SS" 형식 (예: "2025-03-15 15:08:02") → "15:08:02"
    const parts = dateStr.split(" ");
    if (parts.length === 2) return parts[1]; // 시간 부분만 반환
  }
  return dateStr;
}

function formatDateLong(dateStr) {
  return dateStr.slice(0, 10).replace(/-/g, ".");
}

export { formatDate, formatNumber, formatDateLong };
