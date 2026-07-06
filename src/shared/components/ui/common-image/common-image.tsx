import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/cn';

type Radius = 'full' | 'sm' | 'md' | 'lg';

type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

const radiusStyles = {
  full: 'rounded-full',
  sm: 'rounded-[4px]',
  md: 'rounded-[8px]',
  lg: 'rounded-[12px]',
};

const imgSizes = {
  xxs: 40,
  xs: 48,
  sm: 50,
  md: 60,
  lg: 72,
  xl: 96,
  xxl: 110,
  xxxl: 120,
};

interface CommonImgProps extends Omit<ImageProps, 'width' | 'height'> {
  size: Size;
  radius: Radius;
}

export const CommonImage = ({
  src,
  alt,
  size,
  radius,
  className,
  ...imageProps
}: CommonImgProps) => {
  const imageSize = imgSizes[size];

  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      width={imageSize}
      height={imageSize}
      className={cn(
        'aspect-square shrink-0 object-cover',
        radiusStyles[radius],
        className,
      )}
    />
  );
};
