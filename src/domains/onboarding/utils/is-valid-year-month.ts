export const isValidYearMonth = (value: string) => {
  const match = value.match(/^(\d{4})\.(\d{2})$/);

  if (!match) return false;

  const month = Number(match[2]);

  return month >= 1 && month <= 12;
};
