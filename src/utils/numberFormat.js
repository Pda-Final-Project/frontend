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
  if (dateStr && dateStr.length === 14) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const h = dateStr.slice(8, 10);
    const m = dateStr.slice(10, 12);
    const s = dateStr.slice(12, 14);
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
  }
  return dateStr;
}

function formatDateLong(dateStr) {
  return dateStr.slice(0, 10).replace(/-/g, ".");
}

export { formatDate, formatNumber, formatDateLong };
