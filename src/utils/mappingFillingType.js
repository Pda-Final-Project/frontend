export const mapFilingType = (filingType) => {
  const mapping = {
    "SCHEDULE 13G": "SC 13D",
    "SCHEDULE 13G/A": "SC 13D",
    "SCHEDULE 13D": "SC 13D",
    "SCHEDULE 13D/A": "SC 13D",
    "SC 13D": "SC 13D",
    "SC 13D/A": "SC 13D",
    "SC 13G": "SC 13D",
    "SC 13G/A": "SC 13D",

    "Form S-1": "FormS-1",
    "S-1": "FormS-1",
    "Form S-1MEF": "FormS-1",
    "S-1MEF": "FormS-1",

    "10-Q": "10-Q",
    "10-QT": "10-Q",

    "8-K": "8-K",
    "8-K/A": "8-K",

    "Form 4": "Form4",
    4: "Form4",
    "4/A": "Form4",
  };

  return mapping[filingType] || "unknown";
};
