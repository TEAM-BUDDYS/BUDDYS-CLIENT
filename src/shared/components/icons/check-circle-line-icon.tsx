import type { SVGProps } from 'react';
export const CheckCircleLineIcon = ({
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
        d="M11.28 2.024c-2.109.185-3.979.926-5.56 2.201-1.676 1.351-2.909 3.28-3.417 5.346-.216.881-.277 1.41-.277 2.43 0 1.018.061 1.547.277 2.428.886 3.607 3.84 6.502 7.457 7.311.844.19 1.287.236 2.24.236s1.396-.047 2.24-.236c3.618-.809 6.571-3.704 7.457-7.31.213-.87.276-1.414.278-2.41.001-.976-.043-1.404-.235-2.26-.458-2.049-1.658-4.025-3.26-5.369-1.824-1.53-3.915-2.32-6.26-2.368a16 16 0 0 0-.94.001m1.54 2.017c2.788.311 5.174 1.99 6.38 4.488a7.95 7.95 0 0 1 0 6.945A8.02 8.02 0 0 1 12 20 8.015 8.015 0 0 1 4.002 12c0-1.202.273-2.39.798-3.47A7.97 7.97 0 0 1 8.53 4.8c1.322-.64 2.885-.916 4.29-.759m3.2 4.075a1.6 1.6 0 0 0-.26.102c-.077.04-1.274 1.203-2.66 2.586l-2.52 2.516-1.08-1.083c-1.215-1.218-1.313-1.29-1.74-1.29-.29-.002-.459.066-.674.267a.976.976 0 0 0-.196 1.166c.136.262 3.007 3.13 3.258 3.256.206.103.623.114.843.022.191-.078 6.016-5.883 6.135-6.113a1.04 1.04 0 0 0-.103-1.078c-.2-.264-.686-.434-1.003-.35"
        clipRule="evenodd"
      />
    </svg>
  );
};
