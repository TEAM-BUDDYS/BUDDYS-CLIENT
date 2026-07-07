import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/cn';

interface CommonImageProps extends Omit<
  ImageProps,
  'fill' | 'width' | 'height'
> {
  size: number;
  radius: string;
}

export const CommonImage = ({
  src,
  alt,
  size,
  radius,
  className,
  ...imageProps
}: CommonImageProps) => {
  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('aspect-square shrink-0 object-cover', radius, className)}
    />
  );
};
