export const format = (date: Date | string | number, locale = "en-GB"): string => {
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
};
