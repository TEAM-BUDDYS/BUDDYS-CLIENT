import type { SVGProps } from 'react';
import * as React from 'react';
export const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="currentColor"
      strokeWidth={2}
      d="M5.05 8.734C4.207 7.608 5.01 6 6.419 6h11.164c1.409 0 2.212 1.608 1.367 2.734A4.75 4.75 0 0 0 18 11.582V18a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6.418a4.75 4.75 0 0 0-.95-2.848Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 17v-6M10 17v-6"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="m16 6-.544-1.632A2 2 0 0 0 13.559 3h-3.117a2 2 0 0 0-1.898 1.368L8 6"
    />
  </svg>
);
