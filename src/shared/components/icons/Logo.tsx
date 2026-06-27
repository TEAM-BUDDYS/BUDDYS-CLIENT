import type { SVGProps } from 'react';
import * as React from 'react';
export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 289 289"
    aria-hidden="true"
    {...props}
  >
    <rect width={289} height={289} fill="#0ED8D4" rx={60} />
    <path
      fill="#fff"
      d="M150.341 217.299c0 3.438 2.855 6.202 6.228 5.741 40.791-5.58 72.353-46.024 72.353-86.769-.001-42.795-39.671-67.19-83.432-69.271z"
    />
    <path
      fill="#fff"
      d="M62 136.273c0 38.257 37.38 69.271 83.49 69.271 46.111 0 83.49-31.014 83.49-69.271S189.223 67 145.49 67C99.38 67 62 98.015 62 136.273"
    />
  </svg>
);
