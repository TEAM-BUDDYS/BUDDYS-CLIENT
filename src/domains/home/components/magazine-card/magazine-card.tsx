import Link from 'next/link';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface MagazineCardProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
  className?: string;
}

export const MagazineCard = ({
  title,
  description,
  image,
  href,
  className,
}: MagazineCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'focus-visible:outline-mint-300 flex w-full flex-col items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
        className,
      )}
    >
      <CommonImage
        src={image.src}
        alt={image.alt}
        width={343}
        height={192}
        radius="rounded-lg"
        sizes="(max-width: 430px) calc(100vw - 32px), 398px"
        className="aspect-343/192 h-auto w-full"
      />

      <div className="flex w-full flex-col gap-1">
        <h3 className="text-body-sb-16 w-full truncate text-gray-800">
          {title}
        </h3>
        <p className="text-caption-m-12 w-full truncate text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};
