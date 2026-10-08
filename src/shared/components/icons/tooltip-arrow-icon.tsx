import type { SVGProps } from 'react';
export const TooltipArrowIcon = ({
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
      overflow="visible"
      preserveAspectRatio="none"
      style={{
        display: 'block',
      }}
      viewBox="0 0 15.182 11.731"
      {...props}
    >
      <path
        id="Polygon 3"
        fill="#00CFD7"
        d="M3.608 2.37C4.628 1.31 5.138.78 5.683.486a4 4 0 0 1 3.816 0c.545.295 1.055.825 2.075 1.886 2.08 2.16 3.119 3.24 3.404 4.102a4 4 0 0 1-2.07 4.866c-.82.392-2.318.392-5.317.392s-4.498 0-5.317-.392a4 4 0 0 1-2.07-4.866c.285-.861 1.325-1.942 3.404-4.102"
      />
    </svg>
  );
};
