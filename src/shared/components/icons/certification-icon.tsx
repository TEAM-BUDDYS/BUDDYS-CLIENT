import type { SVGProps } from 'react';
export const CertificationIcon = ({
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
      <g filter="url(#filter0_i_3278_28158)">
        <path
          fill="#0076D7"
          d="M11.268 3.736C8.22 6.696 6.254 7.273 3.866 7.808a.966.966 0 0 0-.76 1.072C3.75 13.405 6.224 21 12 21s8.25-7.595 8.893-12.12a.966.966 0 0 0-.759-1.072c-2.388-.535-4.354-1.113-7.402-4.072a1.053 1.053 0 0 0-1.464 0"
        />
      </g>
      <g filter="url(#filter1_di_3278_28158)">
        <path
          fill="#E6F3FB"
          d="M11.264 5.732C9.068 7.82 7.594 8.3 5.866 8.696c-.494.113-.831.57-.754 1.07C5.654 13.304 7.588 19 12 19s6.346-5.696 6.889-9.234c.076-.5-.261-.957-.755-1.07-1.728-.396-3.202-.877-5.398-2.964a1.07 1.07 0 0 0-1.472 0"
        />
      </g>
      <g filter="url(#filter2_d_3278_28158)">
        <path
          stroke="url(#paint0_linear_3278_28158)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12.333 11.25 15 15 11"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_3278_28158"
          width={17.807}
          height={21.56}
          x={3.097}
          y={3.44}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28158" />
        </filter>
        <filter
          id="filter1_di_3278_28158"
          width={15.799}
          height={18.81}
          x={4.101}
          y={4.19}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28158"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28158"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.882353 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28158" />
        </filter>
        <filter
          id="filter2_d_3278_28158"
          width={8.25}
          height={6.25}
          x={7.875}
          y={10.125}
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
            result="effect1_dropShadow_3278_28158"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28158"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3278_28158"
          x1={11.25}
          x2={15.666}
          y1={15.4}
          y2={10.884}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0076D7" />
          <stop offset={0.5} stopColor="#00CFD7" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
};
