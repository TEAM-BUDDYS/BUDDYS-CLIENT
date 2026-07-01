import type { SVGProps } from 'react';
export const HomeIcon = ({
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
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.517 2.682c-.393.105-.72.345-4.944 3.633-4.875 3.793-4.55 3.505-4.553 4.04 0 .313.082.51.31.73.224.219.447.273 1.114.273h.553L4 15.488c.003 4.605-.008 4.41.28 4.887.166.277.505.6.79.755.433.235.19.227 6.928.227 6.736 0 6.492.008 6.931-.227.268-.143.698-.573.841-.841.23-.428.227-.385.227-4.841l.001-4.09h.55c.302 0 .62-.02.706-.044a1 1 0 0 0 .576-1.496c-.106-.166-8.554-6.764-8.904-6.953a2.3 2.3 0 0 0-.42-.171c-.233-.062-.775-.068-.988-.012m3.684 4.432 3.155 2.454-.12.15c-.252.319-.239.048-.239 5.065v4.575h-5v-2.553c0-2.91.007-2.833-.303-3.144a1.05 1.05 0 0 0-.697-.303c-.237 0-.514.12-.697.303-.31.31-.303.235-.303 3.144v2.553h-5v-4.554c0-4.98.01-4.771-.235-5.08l-.124-.156 3.17-2.465c1.743-1.356 3.185-2.46 3.203-2.453a327 327 0 0 1 3.19 2.464"
        clipRule="evenodd"
      />
    </svg>
  );
};
