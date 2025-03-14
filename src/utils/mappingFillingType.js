export const mapFilingType = (filingType) => {
  const mapping = {
    "SCHEDULE 13G": "SC-13G",
    "SCHEDULE 13G/A": "SC-13G",
    "SCHEDULE 13D": "SC-13G",
    "SCHEDULE 13D/A": "SC-13G",
    "SC 13D": "SC-13G",
    "SC 13D/A": "SC-13G",
    "SC 13G": "SC-13G",
    "SC 13G/A": "SC-13G",

    "Form S-1": "S-1",
    "S-1": "S-1",
    "Form S-1MEF": "S-1",
    "S-1MEF": "S-1",

    "10-Q": "10-Q",
    "10-QT": "10-Q",

    "8-K": "8-K",
    "8-K/A": "8-K",

    "Form 4": "4",
    4: "4",
    "4/A": "4",
  };

  return mapping[filingType] || "unknown";
};
