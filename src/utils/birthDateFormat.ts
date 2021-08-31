export const birthDateFormat = (date: string | undefined) => {
  const regexp = /[.,-/\\]/;
  const splitedDate = date?.split(regexp);
  const resultDate = splitedDate?.join(".");
  return resultDate;
};
