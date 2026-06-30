import type { SVGProps } from 'react';
export const BookmarkIcon = ({
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
        d="M5 7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v12.22a1 1 0 0 1-1.52.854l-4.44-2.704a2 2 0 0 0-2.08 0l-4.44 2.704A1 1 0 0 1 5 19.22z"
      />
    </svg>
  );
};
