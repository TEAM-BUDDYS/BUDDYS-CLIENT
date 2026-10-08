import type { SVGProps } from 'react';
export const MinusIcon = ({
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
      viewBox="0 0 21.818 21.818"
      {...props}
    >
      <g id="System">
        <path
          id="Vector"
          fill="currentColor"
          fillRule="evenodd"
          d="M4.248 10.057c-.33.102-.612.494-.612.852 0 .368.281.751.628.854.163.049.968.055 6.645.055s6.482-.006 6.646-.055c.343-.102.627-.489.627-.854s-.284-.752-.627-.854c-.274-.081-13.042-.079-13.307.002"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};
