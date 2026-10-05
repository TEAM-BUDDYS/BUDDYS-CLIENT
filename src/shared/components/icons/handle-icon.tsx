import type { SVGProps } from 'react';
export const HandleIcon = ({
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
      <g fill="currentColor" clipPath="url(#clip0_1263_675)">
        <path d="M8.571 6.857a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428M8.571 20.571a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428M15.429 6.857a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428M15.429 20.571a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428M15.429 13.714a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428M8.571 13.714a1.714 1.714 0 1 0 0-3.428 1.714 1.714 0 0 0 0 3.428" />
      </g>
      <defs>
        <clipPath id="clip0_1263_675">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
