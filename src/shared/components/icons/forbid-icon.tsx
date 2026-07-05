import type { SVGProps } from 'react';
export const ForbidIcon = ({
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
        d="M4 12a8 8 0 0 1 12.904-6.318L5.683 16.904A7.96 7.96 0 0 1 4 12m-2 0c0 5.523 4.477 10 10 10v-2a7.96 7.96 0 0 1-4.903-1.682L18.318 7.096A8 8 0 0 1 12 20v2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12"
      />
    </svg>
  );
};
