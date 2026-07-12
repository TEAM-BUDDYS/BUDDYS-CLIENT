type DateInputVariant = 'shortDate' | 'yearMonth' | 'date';

interface FormatDateInputOptions {
  variant?: DateInputVariant;
}

const DATE_INPUT_CONFIG = {
  shortDate: {
    yearLength: 2,
    maxLength: 6,
  },
  yearMonth: {
    yearLength: 4,
    maxLength: 6,
  },
  date: {
    yearLength: 4,
    maxLength: 8,
  },
} satisfies Record<
  DateInputVariant,
  {
    yearLength: number;
    maxLength: number;
  }
>;

export const formatDateInput = (
  value: string,
  previousValue = '',
  options: FormatDateInputOptions = {},
) => {
  const { variant = 'shortDate' } = options;
  const { yearLength, maxLength } = DATE_INPUT_CONFIG[variant];
  const rawNumbers = value.replace(/\D/g, '').slice(0, maxLength);
  const isDeletingAutoSeparator =
    previousValue.endsWith('.') && value === previousValue.slice(0, -1);
  const numbers = isDeletingAutoSeparator
    ? rawNumbers.slice(0, -1)
    : rawNumbers;
  const year = numbers.slice(0, yearLength);
  const month = numbers.slice(yearLength, yearLength + 2);
  const day = numbers.slice(yearLength + 2, yearLength + 4);

  if (numbers.length <= yearLength) {
    return numbers.length === yearLength ? `${year}.` : year;
  }

  if (numbers.length <= yearLength + 2) {
    return `${year}.${month}`;
  }

  if (variant === 'yearMonth') {
    return `${year}.${month}`;
  }

  return `${year}.${month}.${day}`;
};
