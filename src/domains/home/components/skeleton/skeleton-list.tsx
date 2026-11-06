import { Fragment, type ReactNode } from 'react';

interface SkeletonListProps {
  count: number;
  label: string;
  className?: string;
  children: ReactNode;
}

export const SkeletonList = ({
  count,
  label,
  className,
  children,
}: SkeletonListProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={className}
    >
      {Array.from({ length: count }, (_, index) => (
        <Fragment key={index}>{children}</Fragment>
      ))}
    </div>
  );
};
