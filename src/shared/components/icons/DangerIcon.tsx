import type { SVGProps } from 'react';
export const DangerIcon = ({
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
        stroke="currentColor"
        strokeWidth={2}
        d="M2 17.926c0-.607.155-1.205.45-1.736L8.636 5.056a3.849 3.849 0 0 1 6.728 0L21.55 16.19a3.574 3.574 0 0 1-3.124 5.31H5.574A3.574 3.574 0 0 1 2 17.926Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v4M12 16v.5"
      />
    </svg>
  );
};
