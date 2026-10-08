import type { SVGProps } from 'react';
export const SightseeingIcon = ({
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M2 21h20M7.556 21V4.125c0-.298.117-.585.325-.795S8.372 3 8.667 3h6.666c.295 0 .578.119.786.33.208.21.325.497.325.795V21m0-11.25h3.334c.295 0 .577.119.786.33.208.21.325.497.325.795V21M7.556 7.5H4.222c-.294 0-.577.119-.785.33a1.13 1.13 0 0 0-.326.795V21m8.333-13.5h1.112M11.444 12h1.112m-1.112 4.5h1.112"
      />
    </svg>
  );
};
