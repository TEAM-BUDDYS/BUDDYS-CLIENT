import type { SVGProps } from 'react';
export const EditIcon = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  const hasLabel = Boolean(ariaLabel || ariaLabelledBy);
  const props = {
    ...rest,
    role: role ?? (hasLabel ? 'img' : undefined),
    'aria-hidden': hasLabel ? undefined : true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.85 2.501a2.2 2.2 0 0 0-.46.164c-.165.086-1.38 1.277-5.638 5.532-5.1 5.094-5.436 5.44-5.55 5.684-.067.144-.14.362-.163.485-.026.144-.037 1.24-.03 3.08l.01 2.854.112.19c.125.212.318.374.539.453.123.044 1.595.054 8.293.055 7.176.002 8.167-.005 8.347-.059.378-.112.69-.537.69-.939 0-.237-.12-.514-.303-.697-.32-.32-.066-.303-4.614-.303H12.06l4.585-4.59c4.298-4.302 4.593-4.607 4.709-4.855a2.04 2.04 0 0 0-.018-1.755c-.136-.29-.22-.378-2.49-2.648C16.582 2.885 16.49 2.8 16.2 2.663c-.475-.224-.855-.27-1.35-.162m3.23 7.65c-.803.807-3.116 3.13-5.14 5.16L9.26 19H5v-4.26l5.15-5.15 5.15-5.15 2.12 2.12 2.12 2.12z"
        clipRule="evenodd"
      />
    </svg>
  );
};
