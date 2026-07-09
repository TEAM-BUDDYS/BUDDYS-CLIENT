import type { SVGProps } from 'react';
export const CountryIcon = ({
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
      <g filter="url(#filter0_di_3159_41956)">
        <path
          fill="#E6FAFB"
          d="M11 9h9.466a.25.25 0 0 1 .192.41L17.667 13l2.991 3.59a.25.25 0 0 1-.192.41H11z"
        />
      </g>
      <g filter="url(#filter1_di_3159_41956)">
        <path fill="#00CFD7" d="M5 5h9.5a.5.5 0 0 1 .5.5V14H5z" />
      </g>
      <path fill="#00A6AC" d="M15 14h-4v3z" />
      <g filter="url(#filter2_i_3159_41956)">
        <path fill="url(#paint0_linear_3159_41956)" d="M4 5h2v17H4z" />
      </g>
      <g filter="url(#filter3_i_3159_41956)">
        <circle cx={5} cy={4} r={2} fill="url(#paint1_linear_3159_41956)" />
      </g>
      <g filter="url(#filter4_d_3159_41956)">
        <circle
          cx={5}
          cy={4}
          r={2}
          fill="url(#paint2_radial_3159_41956)"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_3159_41956"
          width={10.717}
          height={12.25}
          x={10.5}
          y={8.75}
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
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3159_41956"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3159_41956"
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
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3159_41956" />
        </filter>
        <filter
          id="filter1_di_3159_41956"
          width={11}
          height={13.25}
          x={4.5}
          y={4.75}
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
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3159_41956"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3159_41956"
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
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3159_41956" />
        </filter>
        <filter
          id="filter2_i_3159_41956"
          width={2}
          height={21}
          x={4}
          y={5}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.811765 0 0 0 0 0.843137 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3159_41956" />
        </filter>
        <filter
          id="filter3_i_3159_41956"
          width={4}
          height={8}
          x={3}
          y={2}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.811765 0 0 0 0 0.843137 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3159_41956" />
        </filter>
        <filter
          id="filter4_d_3159_41956"
          width={5}
          height={5}
          x={2.5}
          y={1.75}
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
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3159_41956"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3159_41956"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3159_41956"
          x1={5}
          x2={5}
          y1={6}
          y2={22}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A6AC" />
          <stop offset={0.496} stopColor="#00CFD7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3159_41956"
          x1={5}
          x2={5}
          y1={6}
          y2={22}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.312} stopColor="#00A6AC" />
          <stop offset={1} stopColor="#00CFD7" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_3159_41956"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-4 4 -4 -4 7 2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0F0F3" />
          <stop offset={0.688} stopColor="#B0F0F3" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};
