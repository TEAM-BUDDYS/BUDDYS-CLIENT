import type { SVGProps } from 'react';
import * as React from 'react';
export const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#00CFD7"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
      opacity={0.4}
    />
    <path
      fill="#00CFD7"
      d="M11.75 7A3.754 3.754 0 0 0 8 10.755c0 2.033 1.59 3.685 3.7 3.745h.18a3.746 3.746 0 0 0 3.62-3.745A3.754 3.754 0 0 0 11.75 7M19 19.574c-1.838 1.538-4.295 2.486-7 2.486s-5.162-.948-7-2.486c.248-.854.919-1.633 1.9-2.233 2.818-1.708 7.402-1.708 10.2 0 .991.6 1.652 1.379 1.9 2.233"
    />
  </svg>
);
