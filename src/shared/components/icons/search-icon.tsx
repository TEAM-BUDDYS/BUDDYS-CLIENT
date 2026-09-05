import type { SVGProps } from 'react';
interface SearchIconProps extends SVGProps<SVGSVGElement> {
  iconOpacity?: number;
}

export const SearchIcon = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role,
  iconOpacity = 0.6,
  ...rest
}: SearchIconProps) => {
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
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        opacity={iconOpacity}
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m16.5 16.958 5 5" />
      </g>
    </svg>
  );
};
