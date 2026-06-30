import type { SVGProps } from 'react';
export const KakaoIcon = ({
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
        d="M12 3.6c-4.97 0-9 3.113-9 6.952 0 2.388 1.558 4.493 3.932 5.745l-.999 3.647c-.088.322.28.58.563.393l4.377-2.89q.554.056 1.127.057c4.97 0 9-3.113 9-6.952S16.97 3.6 12 3.6"
        clipRule="evenodd"
      />
    </svg>
  );
};
