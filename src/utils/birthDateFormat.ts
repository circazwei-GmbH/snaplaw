export const birthDateFormat = (date: string | undefined) => {
  date = date?.replace(/[-/\\\s]/, "");
  if (date !== undefined && date.length < 3) {
    date = date.replace(/[0-9]{2}/, "$&.");
  }
  if (date !== undefined && date.length < 6) {
    date = date.replace(/[0-9]{2}.[0-9]{2}/, "$&.");
  }
  return date;
};
