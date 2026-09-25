import type { SVGProps } from 'react';
export const CourseMarkerIcon = ({
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
      viewBox="0 0 24 24"
      {...props}
    >
      <g id="pin_map_course" clipPath="url(#clip0_0_580)">
        <g id="Vector" filter="url(#filter0_d_0_580)">
          <path
            fill="#FF5C4E"
            d="M13.734 21.816C16.349 19.515 21 14.814 21 10.5a9 9 0 1 0-18 0c0 4.314 4.65 9.015 7.266 11.316a2.604 2.604 0 0 0 3.468 0M9 10.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_0_580">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
        <filter
          id="filter0_d_0_580"
          width={20}
          height={22.977}
          x={2}
          y={1.5}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.42 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_580" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_0_580"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
