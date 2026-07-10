export const formatDateInput = (value: string, previousValue = '') => {
  const rawNumbers = value.replace(/\D/g, '').slice(0, 6);
  const isDeletingAutoSeparator =
    previousValue.endsWith('.') && value === previousValue.slice(0, -1);
  const numbers = isDeletingAutoSeparator
    ? rawNumbers.slice(0, -1)
    : rawNumbers;
  const year = numbers.slice(0, 2);
  const month = numbers.slice(2, 4);
  const day = numbers.slice(4, 6);

  if (numbers.length <= 2) {
    return numbers.length === 2 ? `${year}.` : year;
  }

  if (numbers.length <= 4) {
    return numbers.length === 4 ? `${year}.${month}.` : `${year}.${month}`;
  }

  return `${year}.${month}.${day}`;
};
