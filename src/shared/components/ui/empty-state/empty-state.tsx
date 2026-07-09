import type { StaticImageData } from 'next/image';

import { cn } from '@/lib/cn';
import { emptyStateImage } from '@/shared/assets/illustrations';

import { CommonImage } from '../common-image/common-image';

interface EmptyStateProps {
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  description: string;
  className?: string;
}

const DEFAULT_IMAGE_WIDTH = 180;
const DEFAULT_IMAGE_HEIGHT = 143;

export const EmptyState = ({
  imageSrc = emptyStateImage,
  imageAlt,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  title,
  description,
  className,
}: EmptyStateProps) => {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center text-center',
        className,
      )}
    >
      <CommonImage
        src={imageSrc}
        alt={imageAlt ?? ''}
        width={imageWidth}
        height={imageHeight}
        radius="rounded-none"
        className="object-contain"
      />

      <p className="text-title-b-18 mt-6 text-gray-800">{title}</p>
      <p className="text-body-r-14 mt-1 text-gray-500">{description}</p>
    </section>
  );
};
