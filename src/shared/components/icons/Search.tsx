import type { SVGProps } from 'react';
import * as React from 'react';
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g
      stroke="#2C3037"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      opacity={0.6}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m16.5 16.958 5 5" />
    </g>
  </svg>
);
