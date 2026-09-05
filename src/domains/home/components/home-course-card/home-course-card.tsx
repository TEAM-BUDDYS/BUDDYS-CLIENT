import Link from 'next/link';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface HomeCourseCardProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
  className?: string;
}

export const HomeCourseCard = ({
  title,
  description,
  image,
  href,
  className,
}: HomeCourseCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'focus-visible:outline-mint-300 flex w-32.5 flex-col items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
        className,
      )}
    >
      <CommonImage
        src={image.src}
        alt={image.alt}
        width={130}
        height={130}
        radius="rounded-tl-[65px] rounded-tr-[65px] rounded-br-[65px] rounded-bl-[9.63px]"
        className="size-32.5"
      />

      <div className="flex w-32.25 flex-col items-start gap-0.5">
        <h3 className="text-body-sb-15 w-32.25 truncate text-gray-800">
          {title}
        </h3>
        <p className="text-caption-m-12 w-32.25 truncate text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};
