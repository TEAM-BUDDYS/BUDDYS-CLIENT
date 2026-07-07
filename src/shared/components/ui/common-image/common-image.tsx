import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/cn';

interface CommonImageProps extends Omit<ImageProps, 'fill'> {
  radius: string;
}

export const CommonImage = ({
  src,
  alt,
  width,
  height,
  radius,
  className,
  ...imageProps
}: CommonImageProps) => {
  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('shrink-0 object-cover', radius, className)}
    />
  );
};
