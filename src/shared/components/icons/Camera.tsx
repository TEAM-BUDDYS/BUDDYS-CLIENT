import type { SVGProps } from 'react';
import * as React from 'react';
export const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="#2C3037"
      strokeWidth={2}
      d="M2 10.547A3.947 3.947 0 0 1 5.947 6.6c.638 0 1.213-.383 1.458-.972l.326-.782A3 3 0 0 1 10.5 3h3a3 3 0 0 1 2.77 1.846l.325.782c.245.589.82.972 1.458.972A3.947 3.947 0 0 1 22 10.547V16a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z"
    />
    <ellipse
      cx={3}
      cy={3.086}
      stroke="#2C3037"
      strokeWidth={2}
      rx={3}
      ry={3.086}
      transform="matrix(-1 0 0 1 15 9.686)"
    />
  </svg>
);
