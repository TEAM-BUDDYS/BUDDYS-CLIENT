import type { SVGProps } from 'react';
export const GoogleIcon = ({
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
      <mask
        id="mask0_34_382"
        width={16}
        height={16}
        x={4}
        y={4}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path
          fill="#fff"
          d="M19.846 10.516H12.17v3.076h4.411c-.07.435-.23.863-.463 1.253a3.7 3.7 0 0 1-.936 1.048c-1.014.777-2.196.936-3.017.936-2.074 0-3.846-1.34-4.532-3.162-.027-.066-.046-.134-.068-.202a4.7 4.7 0 0 1 .019-2.984c.645-1.893 2.457-3.308 4.583-3.308q.642 0 1.23.153a4.4 4.4 0 0 1 1.91 1.05l2.334-2.285C16.22 4.788 14.37 4 12.163 4a8.25 8.25 0 0 0-4.73 1.48 8.06 8.06 0 0 0-2.57 2.934A7.8 7.8 0 0 0 4 11.999c0 1.295.306 2.512.863 3.588v.008a8.1 8.1 0 0 0 2.497 2.877A8.22 8.22 0 0 0 12.163 20c1.293 0 2.44-.233 3.45-.67a7 7 0 0 0 1.961-1.255 7.1 7.1 0 0 0 1.792-2.556c.413-.994.634-2.117.634-3.336 0-.567-.057-1.143-.154-1.667"
        />
      </mask>
      <g mask="url(#mask0_34_382)">
        <g filter="url(#filter0_f_34_382)">
          <path
            fill="url(#paint0_radial_34_382)"
            d="M3.882 12.054c.009 1.274.372 2.589.921 3.65v.008c.398.77.94 1.38 1.559 1.983l3.733-1.363c-.706-.359-.814-.578-1.32-.98A4.7 4.7 0 0 1 7.63 13.53h-.01l.01-.007c-.158-.464-.173-.957-.179-1.468z"
          />
        </g>
        <g filter="url(#filter1_f_34_382)">
          <path
            fill="url(#paint1_radial_34_382)"
            d="M12.17 3.942c-.368 1.296-.227 2.557 0 3.29q.642 0 1.226.152a4.4 4.4 0 0 1 1.91 1.05l2.395-2.343c-1.418-1.3-3.125-2.147-5.53-2.149"
          />
        </g>
        <g filter="url(#filter2_f_34_382)">
          <path
            fill="url(#paint2_radial_34_382)"
            d="M12.162 3.932c-1.81 0-3.481.564-4.85 1.517A8.3 8.3 0 0 0 5.92 6.666c-.11 1.022.815 2.277 2.644 2.267a4.83 4.83 0 0 1 3.661-1.7h.004l-.06-3.3z"
          />
        </g>
        <g filter="url(#filter3_f_34_382)">
          <path
            fill="url(#paint3_radial_34_382)"
            d="m18.137 12.423-1.616 1.11c-.07.436-.23.864-.463 1.254a3.7 3.7 0 0 1-.936 1.048c-1.011.775-2.19.935-3.011.935-.849 1.445-.997 2.169.06 3.335 1.307-.001 2.466-.237 3.489-.68a7.2 7.2 0 0 0 1.986-1.271 7.2 7.2 0 0 0 1.816-2.59c.42-1.007.643-2.146.643-3.38z"
          />
        </g>
        <g filter="url(#filter4_f_34_382)">
          <path
            fill="#3086FF"
            d="M12.051 10.4v3.309h7.774c.068-.453.294-1.04.294-1.525 0-.568-.057-1.261-.153-1.785z"
          />
        </g>
        <g filter="url(#filter5_f_34_382)">
          <path
            fill="url(#paint4_radial_34_382)"
            d="M5.958 6.55a8 8 0 0 0-1.215 1.747C4.186 9.384 3.88 10.705 3.88 12l.002.055c.247.473 3.41.383 3.57 0L7.45 12c0-.531.09-.923.253-1.403a4.9 4.9 0 0 1 .921-1.607c.092-.117.336-.368.407-.52.028-.057-.049-.089-.053-.109-.005-.023-.107-.004-.13-.021-.073-.054-.217-.082-.305-.106-.187-.053-.498-.17-.67-.292-.545-.383-1.396-.84-1.915-1.393"
          />
        </g>
        <g filter="url(#filter6_f_34_382)">
          <path
            fill="url(#paint5_radial_34_382)"
            d="M7.884 8.364c1.264.766 1.628-.386 2.468-.747L8.89 4.587a8.3 8.3 0 0 0-1.517.834 8.1 8.1 0 0 0-1.839 1.768z"
          />
        </g>
        <g filter="url(#filter7_f_34_382)">
          <path
            fill="url(#paint6_radial_34_382)"
            d="M8.399 16.098c-1.697.613-1.962.635-2.118 1.686q.448.437.96.805c.914.655 2.672 1.528 4.922 1.528h.007v-3.405h-.005c-.842 0-1.515-.221-2.205-.606-.17-.095-.48.16-.636.046-.217-.157-.737.135-.925-.054"
          />
        </g>
        <g filter="url(#filter8_f_34_382)" opacity={0.5}>
          <path
            fill="url(#paint7_linear_34_382)"
            d="M11.177 16.605v3.453c.315.037.642.06.986.06q.516-.002 1.001-.051v-3.439a6 6 0 0 1-.999.084c-.339 0-.669-.04-.988-.107"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_34_382"
          width={6.294}
          height={5.722}
          x={3.842}
          y={12.013}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter1_f_34_382"
          width={5.838}
          height={4.574}
          x={11.903}
          y={3.901}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter2_f_34_382"
          width={6.399}
          height={5.082}
          x={5.872}
          y={3.891}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter3_f_34_382"
          width={8.76}
          height={8.003}
          x={11.385}
          y={12.143}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter4_f_34_382"
          width={8.149}
          height={3.391}
          x={12.011}
          y={10.359}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter5_f_34_382"
          width={5.238}
          height={5.907}
          x={3.84}
          y={6.509}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter6_f_34_382"
          width={5.388}
          height={4.606}
          x={5.249}
          y={4.301}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.143}
          />
        </filter>
        <filter
          id="filter7_f_34_382"
          width={5.971}
          height={4.114}
          x={6.24}
          y={16.044}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <filter
          id="filter8_f_34_382"
          width={2.068}
          height={3.594}
          x={11.136}
          y={16.564}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_34_382"
            stdDeviation={0.02}
          />
        </filter>
        <radialGradient
          id="paint0_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-.33248 -7.96794 11.9541 -.47815 10.02 17.575)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.142} stopColor="#1ABD4D" />
          <stop offset={0.248} stopColor="#6EC30D" />
          <stop offset={0.312} stopColor="#8AC502" />
          <stop offset={0.366} stopColor="#A2C600" />
          <stop offset={0.446} stopColor="#C8C903" />
          <stop offset={0.54} stopColor="#EBCB03" />
          <stop offset={0.616} stopColor="#F7CD07" />
          <stop offset={0.699} stopColor="#FDCD04" />
          <stop offset={0.771} stopColor="#FDCE05" />
          <stop offset={0.861} stopColor="#FFCE0A" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(5.64645 -.00001 0 7.13951 17.477 8.265)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.408} stopColor="#FB4E5A" />
          <stop offset={1} stopColor="#FF4540" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-7.91108 4.28995 5.94584 10.5107 14.393 2.898)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.231} stopColor="#FF4541" />
          <stop offset={0.312} stopColor="#FF4540" />
          <stop offset={0.458} stopColor="#FF4640" />
          <stop offset={0.54} stopColor="#FF473F" />
          <stop offset={0.699} stopColor="#FF5138" />
          <stop offset={0.771} stopColor="#FF5B33" />
          <stop offset={0.861} stopColor="#FF6C29" />
          <stop offset={1} stopColor="#FF8C18" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-14.347 -18.3365 -6.9131 5.18501 12.288 19.07)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.132} stopColor="#0CBA65" />
          <stop offset={0.21} stopColor="#0BB86D" />
          <stop offset={0.297} stopColor="#09B479" />
          <stop offset={0.396} stopColor="#08AD93" />
          <stop offset={0.477} stopColor="#0AA6A9" />
          <stop offset={0.568} stopColor="#0D9CC6" />
          <stop offset={0.667} stopColor="#1893DD" />
          <stop offset={0.769} stopColor="#258BF1" />
          <stop offset={0.859} stopColor="#3086FF" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-1.0153 8.56811 12.1001 1.37445 11.47 5.443)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.366} stopColor="#FF4E3A" />
          <stop offset={0.458} stopColor="#FF8A1B" />
          <stop offset={0.54} stopColor="#FFA312" />
          <stop offset={0.616} stopColor="#FFB60C" />
          <stop offset={0.771} stopColor="#FFCD0A" />
          <stop offset={0.861} stopColor="#FECF0A" />
          <stop offset={0.915} stopColor="#FECF08" />
          <stop offset={1} stopColor="#FDCD01" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-2.93475 3.17785 -9.15481 -8.1044 10.041 5.354)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.316} stopColor="#FF4C3C" />
          <stop offset={0.604} stopColor="#FF692C" />
          <stop offset={0.727} stopColor="#FF7825" />
          <stop offset={0.885} stopColor="#FF8D1B" />
          <stop offset={1} stopColor="#FF9F13" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_34_382"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-7.91108 -4.28995 5.94584 -10.5107 14.393 21.102)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.231} stopColor="#0FBC5F" />
          <stop offset={0.312} stopColor="#0FBC5F" />
          <stop offset={0.366} stopColor="#0FBC5E" />
          <stop offset={0.458} stopColor="#0FBC5D" />
          <stop offset={0.54} stopColor="#12BC58" />
          <stop offset={0.699} stopColor="#28BF3C" />
          <stop offset={0.771} stopColor="#38C02B" />
          <stop offset={0.861} stopColor="#52C218" />
          <stop offset={0.915} stopColor="#67C30F" />
          <stop offset={1} stopColor="#86C504" />
        </radialGradient>
        <linearGradient
          id="paint7_linear_34_382"
          x1={11.177}
          x2={13.164}
          y1={18.361}
          y2={18.361}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0FBC5C" />
          <stop offset={1} stopColor="#0CBA65" />
        </linearGradient>
      </defs>
    </svg>
  );
};
