import type { SVGProps } from 'react';
export const LocationIcon = ({
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
        d="M20 10.5c0 5.142-6.4 10.5-8 10.5s-8-5.358-8-10.5C4 6.358 7.582 3 12 3s8 3.358 8 7.5Z"
      />
      <ellipse
        cx={3}
        cy={2.842}
        stroke="currentColor"
        strokeWidth={2}
        rx={3}
        ry={2.842}
        transform="matrix(-1 0 0 1 15 7.263)"
      />
    </svg>
  );
};
