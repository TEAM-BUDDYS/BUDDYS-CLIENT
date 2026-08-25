import type { SVGProps } from 'react';
export const EditIcon = ({
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.706}
        d="M11.528 3.944H4.895A1.895 1.895 0 0 0 3 5.839v13.266A1.895 1.895 0 0 0 4.895 21h13.266a1.895 1.895 0 0 0 1.895-1.895v-6.633"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.706}
        d="M17.569 3.589a2.01 2.01 0 0 1 2.843 2.842l-8.54 8.542c-.226.224-.504.389-.809.478l-2.722.796a.473.473 0 0 1-.588-.587l.796-2.723c.09-.305.255-.582.48-.807z"
      />
    </svg>
  );
};
