import type { SVGProps } from 'react';
export const CompanionIcon = ({
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
      <g filter="url(#filter0_i_3278_28157)">
        <path
          fill="#FBE6E6"
          d="m18.072 9.937-4.735 2.525a.3.3 0 0 1-.418-.38l1.502-3.606z"
        />
      </g>
      <g filter="url(#filter1_di_3278_28157)">
        <ellipse cx={16.25} cy={7.107} fill="#FBE6E6" rx={5.75} ry={4.107} />
      </g>
      <g filter="url(#filter2_di_3278_28157)">
        <circle cx={13.512} cy={7.107} r={0.821} fill="#FF3E36" />
      </g>
      <g filter="url(#filter3_di_3278_28157)">
        <circle cx={16.25} cy={7.107} r={0.821} fill="#FF3E36" />
      </g>
      <g filter="url(#filter4_di_3278_28157)">
        <circle cx={18.988} cy={7.107} r={0.821} fill="#FF3E36" />
      </g>
      <g fill="#FF3E36" filter="url(#filter5_di_3278_28157)">
        <path d="M7.5 9c-1.735 0-3.143 1.34-3.143 2.993 0 1.62 1.333 2.937 3.101 2.984h.15100000000000002c1.693-.056 3.025-1.364 3.034-2.984C10.643 10.34 9.235 9 7.5 9M12.26 18.02c.601.558.328 1.479-.39 1.876A9 9 0 0 1 7.5 21a9 9 0 0 1-4.37-1.104c-.718-.398-.99-1.316-.387-1.875a4.2 4.2 0 0 1 .75-.547c2.214-1.276 5.816-1.276 8.014 0q.431.249.752.546" />
      </g>
      <defs>
        <filter
          id="filter0_i_3278_28157"
          width={5.178}
          height={8.022}
          x={12.895}
          y={4.476}
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
          <feOffset dy={-4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28157" />
        </filter>
        <filter
          id="filter1_di_3278_28157"
          width={12.5}
          height={12.814}
          x={10}
          y={-1}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.1} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28157"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28157" />
        </filter>
        <filter
          id="filter2_di_3278_28157"
          width={2.143}
          height={2.143}
          x={12.44}
          y={6.286}
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
            result="effect1_dropShadow_3278_28157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28157"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.5} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28157" />
        </filter>
        <filter
          id="filter3_di_3278_28157"
          width={2.143}
          height={2.143}
          x={15.179}
          y={6.286}
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
            result="effect1_dropShadow_3278_28157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28157"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.5} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28157" />
        </filter>
        <filter
          id="filter4_di_3278_28157"
          width={2.143}
          height={2.143}
          x={17.917}
          y={6.286}
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
            result="effect1_dropShadow_3278_28157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28157"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.5} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28157" />
        </filter>
        <filter
          id="filter5_di_3278_28157"
          width={10.679}
          height={14.5}
          x={2.161}
          y={7}
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
            result="effect1_dropShadow_3278_28157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28157"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-2} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.627451 0 0 0 0 0.611765 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28157" />
        </filter>
      </defs>
    </svg>
  );
};
