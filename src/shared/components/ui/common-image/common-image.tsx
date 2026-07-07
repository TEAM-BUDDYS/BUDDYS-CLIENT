import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/cn';

type Radius = 'full' | 'sm' | 'md' | 'lg';

const radiusStyles = {
  full: 'rounded-full',
  sm: 'rounded-[4px]',
  md: 'rounded-[8px]',
  lg: 'rounded-[12px]',
};

interface CommonImageProps extends Omit<ImageProps, 'fill'> {
  radius: Radius;
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
      className={cn(
        'aspect-square shrink-0 object-cover',
        radiusStyles[radius],
        className,
      )}
    />
  );
};
