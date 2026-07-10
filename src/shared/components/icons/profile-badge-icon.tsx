import type { SVGProps } from 'react';
export const ProfileBadgeIcon = ({
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
      <rect width={17} height={17} x={3} y={3} fill="#17B0B5" rx={8.5} />
      <g filter="url(#filter0_d_4009_16995)">
        <circle
          cx={11.5}
          cy={11.5}
          r={6.5}
          fill="url(#paint0_linear_4009_16995)"
        />
      </g>
      <g filter="url(#filter1_d_4009_16995)">
        <path
          stroke="url(#paint1_linear_4009_16995)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M8 11.333 10.25 14 14 10"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4009_16995"
          x1={11.5}
          x2={11.5}
          y1={5}
          y2={18}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#88E8ED" />
          <stop offset={1} stopColor="#E2FEFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4009_16995"
          x1={10.25}
          x2={14.666}
          y1={14.4}
          y2={9.884}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A6AC" />
          <stop offset={0.5} stopColor="#00CFD7" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <filter
          id="filter0_d_4009_16995"
          width={15}
          height={15}
          x={4}
          y={3.75}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-0.25} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4009_16995"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4009_16995"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_4009_16995"
          width={8.25}
          height={6.25}
          x={6.875}
          y={9.125}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.25} />
          <feGaussianBlur stdDeviation={0.125} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4009_16995"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4009_16995"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
