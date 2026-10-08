import type { SVGProps } from 'react';
export const PenIcon = ({
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
      viewBox="0 0 42 42"
      {...props}
    >
      <rect
        width={14.823}
        height={4.941}
        y={32.118}
        fill="#CDD3DE"
        rx={2.471}
      />
      <rect
        width={34.588}
        height={4.941}
        y={22.235}
        fill="#CDD3DE"
        rx={2.471}
      />
      <rect
        width={34.588}
        height={4.941}
        y={12.353}
        fill="#CDD3DE"
        rx={2.471}
      />
      <path
        fill="#474B54"
        d="M12.354 34.364v-6.677c0-.328.13-.642.361-.874l21-21a1.235 1.235 0 0 1 1.747 0l5.665 5.665a1.235 1.235 0 0 1 0 1.747L20.045 34.307a1.24 1.24 0 0 1-.67.345l-5.583.93a1.235 1.235 0 0 1-1.438-1.218"
      />
      <path
        fill="#00CFD7"
        d="m32.118 14.822-2.833-2.832a1.235 1.235 0 0 1 0-1.747l4.43-4.43a1.235 1.235 0 0 1 1.747 0l5.664 5.665a1.235 1.235 0 0 1 0 1.747l-4.43 4.43a1.235 1.235 0 0 1-1.746 0z"
      />
      <path
        fill="#fff"
        d="m37.059 17.293-1.437 1.436-7.412-7.412 1.437-1.436z"
      />
    </svg>
  );
};
