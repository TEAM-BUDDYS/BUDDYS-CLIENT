import type { SVGProps } from 'react';
export const SpeechBubbleIcon = ({
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
      viewBox="0 0 44 44"
      {...props}
    >
      <g filter="url(#filter0_i_4884_76082)">
        <path
          fill="#E6FAFB"
          d="M18.39 26.626 9.173 31.54a.564.564 0 0 1-.786-.714l2.93-7.03z"
        />
      </g>
      <g filter="url(#filter1_di_4884_76082)">
        <ellipse cx={15} cy={20.459} fill="#E6FAFB" rx={11} ry={8.744} />
      </g>
      <g filter="url(#filter2_di_4884_76082)">
        <circle cx={9.556} cy={20.076} r={1.592} fill="#61DBDF" />
      </g>
      <g filter="url(#filter3_di_4884_76082)">
        <circle cx={14.859} cy={20.076} r={1.592} fill="#61DBDF" />
      </g>
      <g filter="url(#filter4_di_4884_76082)">
        <circle cx={20.166} cy={20.076} r={1.592} fill="#61DBDF" />
      </g>
      <defs>
        <filter
          id="filter0_i_4884_76082"
          width={10.049}
          height={10.07}
          x={8.342}
          y={21.54}
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
          <feOffset dy={-2.256} />
          <feGaussianBlur stdDeviation={1.128} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect1_innerShadow_4884_76082" />
        </filter>
        <filter
          id="filter1_di_4884_76082"
          width={22.564}
          height={20.082}
          x={3.718}
          y={9.459}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.056} />
          <feGaussianBlur stdDeviation={0.141} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4884_76082"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4884_76082"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-2.256} />
          <feGaussianBlur stdDeviation={1.128} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_4884_76082" />
        </filter>
        <filter
          id="filter2_di_4884_76082"
          width={3.466}
          height={3.465}
          x={7.824}
          y={18.484}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.141} />
          <feGaussianBlur stdDeviation={0.071} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4884_76082"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4884_76082"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.282} />
          <feGaussianBlur stdDeviation={0.141} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_4884_76082" />
        </filter>
        <filter
          id="filter3_di_4884_76082"
          width={3.466}
          height={3.465}
          x={13.127}
          y={18.484}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.141} />
          <feGaussianBlur stdDeviation={0.071} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4884_76082"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4884_76082"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.282} />
          <feGaussianBlur stdDeviation={0.141} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_4884_76082" />
        </filter>
        <filter
          id="filter4_di_4884_76082"
          width={3.466}
          height={3.465}
          x={18.433}
          y={18.484}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.141} />
          <feGaussianBlur stdDeviation={0.071} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4884_76082"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4884_76082"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.282} />
          <feGaussianBlur stdDeviation={0.141} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.984314 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect2_innerShadow_4884_76082" />
        </filter>
      </defs>
    </svg>
  );
};
