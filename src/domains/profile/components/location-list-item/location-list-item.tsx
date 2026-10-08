import Link from 'next/link';

import { cn } from '@/lib/cn';
import { ChevronRightIcon } from '@/shared/components/icons';

interface LocationListItemProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

export const LocationListItem = ({
  title,
  description,
  href,
  className,
}: LocationListItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center justify-between gap-4.75 border-b border-gray-100 p-4',
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-body-sb-14 truncate text-black">{title}</h3>
        <p className="text-caption-m-12 truncate text-gray-500">
          {description}
        </p>
      </div>
      <ChevronRightIcon className="size-6 shrink-0 text-gray-800" />
    </Link>
  );
};
