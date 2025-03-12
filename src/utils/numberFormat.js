const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

function formatDate(dateStr) {
  if (dateStr && dateStr.length === 8) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}.${month}.${day}`;
  }
  return dateStr;
}

function formatDateLong(dateStr) {
  return dateStr.slice(0, 10).replace(/-/g, ".");
}

export { formatDate, formatNumber, formatDateLong };
