import type { SVGProps } from 'react';
export const GenderIcon = ({
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
      <g filter="url(#filter0_dii_3278_28156)">
        <circle cx={7} cy={6} r={3} fill="#0076D7" />
      </g>
      <g filter="url(#filter1_dii_3278_28156)">
        <circle cx={17} cy={6} r={3} fill="#00BEC5" />
      </g>
      <g filter="url(#filter2_ii_3278_28156)">
        <path
          fill="#0076D7"
          d="M10.382 11H3.618a1 1 0 0 0-.894 1.447l3.382 6.764a1 1 0 0 0 1.788 0l3.382-6.764A1 1 0 0 0 10.382 11"
        />
      </g>
      <g filter="url(#filter3_ii_3278_28156)">
        <path
          fill="#00BEC5"
          d="M13.618 20h6.764a1 1 0 0 0 .894-1.447l-3.382-6.764a1 1 0 0 0-1.788 0l-3.382 6.764A1 1 0 0 0 13.618 20"
        />
      </g>
      <defs>
        <filter
          id="filter0_dii_3278_28156"
          width={6.5}
          height={10}
          x={3.75}
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
          <feOffset dy={0.25} />
          <feGaussianBlur stdDeviation={0.125} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28156"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28156"
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
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.882353 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28156" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend
            in2="effect2_innerShadow_3278_28156"
            result="effect3_innerShadow_3278_28156"
          />
        </filter>
        <filter
          id="filter1_dii_3278_28156"
          width={6.5}
          height={10}
          x={13.75}
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
          <feOffset dy={0.25} />
          <feGaussianBlur stdDeviation={0.125} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28156"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28156"
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
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28156" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend
            in2="effect2_innerShadow_3278_28156"
            result="effect3_innerShadow_3278_28156"
          />
        </filter>
        <filter
          id="filter2_ii_3278_28156"
          width={8.766}
          height={12.764}
          x={2.617}
          y={11}
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
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.883333 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28156" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_innerShadow_3278_28156"
            result="effect2_innerShadow_3278_28156"
          />
        </filter>
        <filter
          id="filter3_ii_3278_28156"
          width={8.766}
          height={12.764}
          x={12.617}
          y={11.236}
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
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28156" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_innerShadow_3278_28156"
            result="effect2_innerShadow_3278_28156"
          />
        </filter>
      </defs>
    </svg>
  );
};
