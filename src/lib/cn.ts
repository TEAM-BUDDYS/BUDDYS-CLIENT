import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const typographyTokens = [
  'title-b-28',
  'title-b-22',
  'title-b-20',
  'title-b-18',
  'title-m-18',
  'body-sb-16',
  'body-m-16',
  'body-sb-15',
  'body-m-15',
  'body-sb-14',
  'body-m-14',
  'body-r-14',
  'caption-m-12',
  'caption-r-12',
  'caption-m-10',
];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: typographyTokens,
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
