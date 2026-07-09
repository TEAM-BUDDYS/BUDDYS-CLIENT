import type { SVGProps } from 'react';
export const AgeIcon = ({
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
      <g filter="url(#filter0_i_3278_28155)">
        <path
          fill="#E6F3FB"
          d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"
        />
      </g>
      <g filter="url(#filter1_di_3278_28155)">
        <path fill="#0076D7" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2z" />
      </g>
      <g fill="#0076D7" filter="url(#filter2_di_3278_28155)">
        <path d="M7 11c-.946 0-1.714.782-1.714 1.746 0 .945.727 1.713 1.691 1.74h.083c.923-.032 1.65-.795 1.654-1.74C8.714 11.782 7.946 11 7 11M9.688 16.36c.258.295.125.728-.207.936A4.66 4.66 0 0 1 7 18c-.92 0-1.775-.26-2.481-.704-.333-.208-.464-.64-.206-.936q.202-.23.501-.417c1.208-.744 3.173-.744 4.372 0q.3.186.502.417" />
      </g>
      <g filter="url(#filter3_d_3278_28155)">
        <g filter="url(#filter4_i_3278_28155)">
          <path
            stroke="#0076D7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M12 17h8"
          />
        </g>
        <g filter="url(#filter5_i_3278_28155)">
          <path
            stroke="#0076D7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M12 15.5h8"
          />
        </g>
      </g>
      <path
        fill="#0076D7"
        d="m12.078 13.5.996-2.828h.625l1 2.828h-.543l-.236-.7h-1.065l-.234.7zm1.705-1.11-.385-1.14h-.023l-.383 1.14zm2.974-.816a.66.66 0 0 0-.242-.355.7.7 0 0 0-.426-.13q-.231 0-.408.118a.76.76 0 0 0-.278.34q-.1.225-.1.535 0 .316.1.543.1.225.28.342.18.115.418.115.21 0 .369-.08a.6.6 0 0 0 .246-.23q.088-.15.092-.35h-.657v-.402H17.3v.34q0 .357-.155.624a1.04 1.04 0 0 1-.423.41 1.3 1.3 0 0 1-.621.145 1.3 1.3 0 0 1-.686-.176 1.2 1.2 0 0 1-.46-.506 1.7 1.7 0 0 1-.163-.771q0-.444.166-.771.168-.331.461-.506.296-.177.666-.176.309 0 .564.119.256.119.42.334.165.213.207.488zm.964-.902h1.84v.426h-1.332v.773h1.234v.426h-1.234v.773h1.34v.43H17.72z"
      />
      <defs>
        <filter
          id="filter0_i_3278_28155"
          width={20}
          height={20}
          x={2}
          y={0}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.462745 0 0 0 0 0.843137 0 0 0 0.2 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28155" />
        </filter>
        <filter
          id="filter1_di_3278_28155"
          width={21}
          height={6.25}
          x={1.5}
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
          <feOffset dy={0.25} />
          <feGaussianBlur stdDeviation={0.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3278_28155"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28155"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.364706 0 0 0 0 0.713726 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28155" />
        </filter>
        <filter
          id="filter2_di_3278_28155"
          width={6.146}
          height={9.5}
          x={3.927}
          y={9}
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
            result="effect1_dropShadow_3278_28155"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28155"
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
          <feColorMatrix values="0 0 0 0 0.364014 0 0 0 0 0.713067 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_3278_28155" />
        </filter>
        <filter
          id="filter3_d_3278_28155"
          width={9}
          height={2.5}
          x={11.5}
          y={15.25}
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
            result="effect1_dropShadow_3278_28155"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3278_28155"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_i_3278_28155"
          width={8.5}
          height={2.5}
          x={11.75}
          y={16.75}
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
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.882353 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28155" />
        </filter>
        <filter
          id="filter5_i_3278_28155"
          width={8.5}
          height={2.5}
          x={11.75}
          y={15.25}
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
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.666667 0 0 0 0 0.882353 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3278_28155" />
        </filter>
      </defs>
    </svg>
  );
};
