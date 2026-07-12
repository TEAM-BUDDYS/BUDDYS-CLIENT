import type { SVGProps } from 'react';
export const DateIcon = ({
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
      <rect
        width={18}
        height={12}
        x={3}
        y={4}
        fill="url(#paint0_linear_3278_28154)"
        rx={2}
      />
      <rect
        width={18}
        height={12}
        x={3}
        y={4}
        fill="url(#paint1_linear_3278_28154)"
        rx={2}
      />
      <g filter="url(#filter0_d_3278_28154)">
        <rect
          width={18}
          height={13}
          x={3}
          y={9}
          fill="url(#paint2_linear_3278_28154)"
          rx={2}
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_3278_28154)">
        <rect width={2} height={4} x={7} y={3} fill="#fff" rx={1} />
      </g>
      <g filter="url(#filter2_d_3278_28154)">
        <rect width={2} height={4} x={15} y={3} fill="#fff" rx={1} />
      </g>
      <g filter="url(#filter3_d_3278_28154)">
        <path
          stroke="url(#paint3_linear_3278_28154)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M8 14.667 11 18l5-5"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3278_28154"
          x1={3}
          x2={18.337}
          y1={4}
          y2={10.39}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F38109" />
          <stop offset={1} stopColor="#FF3E36" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3278_28154"
          x1={3}
          x2={18.337}
          y1={4}
          y2={10.39}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F38109" />
          <stop offset={1} stopColor="#FF3E36" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3278_28154"
          x1={12}
          x2={12}
          y1={9}
          y2={22}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity={0.5} />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3278_28154"
          x1={11}
          x2={16.5}
          y1={18.5}
          y2={12.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF3E36" />
          <stop offset={1} stopColor="#FFA09C" />
        </linearGradient>
        <filter
          id="filter0_d_3278_28154"
          width={20}
          height={15}
          x={2}
          y={7.75}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28154"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28154"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_3278_28154"
          width={3}
          height={5}
          x={6.5}
          y={3}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.5} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28154"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28154"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_3278_28154"
          width={3}
          height={5}
          x={14.5}
          y={3}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.5} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28154"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28154"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_3278_28154"
          width={10.25}
          height={7.25}
          x={6.875}
          y={12.125}
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
            result="effect1_dropShadow_3278_28154"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28154"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
