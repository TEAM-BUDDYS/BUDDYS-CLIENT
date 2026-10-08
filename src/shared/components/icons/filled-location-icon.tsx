import type { SVGProps } from 'react';
export const FilledLocationIcon = ({
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
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        fill="#757A83"
        stroke="#757A83"
        d="M10 5.25c0 2.571-3.2 5.25-4 5.25S2 7.821 2 5.25C2 3.179 3.79 1.5 6 1.5s4 1.679 4 3.75Z"
      />
      <ellipse
        cx={1.5}
        cy={1.421}
        fill="#F1F4F9"
        rx={1.5}
        ry={1.421}
        transform="matrix(-1 0 0 1 7.5 3.632)"
      />
    </svg>
  );
};
