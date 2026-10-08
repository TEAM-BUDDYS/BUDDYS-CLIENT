import type { SVGProps } from 'react';
export const ProfileIcon = ({
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
      <path
        fill="#00CFD7"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"
        opacity={0.4}
      />
      <path
        fill="#00CFD7"
        d="M11.7 6a4.505 4.505 0 0 0-4.5 4.506c0 2.44 1.908 4.422 4.44 4.494h.216a4.495 4.495 0 0 0 4.344-4.494A4.505 4.505 0 0 0 11.7 6"
      />
      <mask
        id="mask0_3093_16528"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fill="#00CFD7"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"
        />
      </mask>
      <g mask="url(#mask0_3093_16528)">
        <path
          fill="#00CFD7"
          d="M20.4 21.09c-2.206 1.846-5.154 2.983-8.4 2.983s-6.195-1.137-8.4-2.984c.297-1.024 1.102-1.959 2.28-2.68 3.382-2.049 8.882-2.049 12.24 0 1.19.721 1.982 1.656 2.28 2.68"
        />
      </g>
    </svg>
  );
};
