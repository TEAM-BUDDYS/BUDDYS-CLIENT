import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';
import { XIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui';

interface ImagePreviewProps extends Omit<ComponentProps<'div'>, 'children'> {
  src: string;
  alt: string;
  onRemove: () => void;
}

export const ImagePreview = ({
  src,
  alt,
  onRemove,
  className,
  ...props
}: ImagePreviewProps) => {
  return (
    <div
      className={cn(
        'relative size-20 shrink-0 overflow-hidden rounded-xl',
        className,
      )}
      {...props}
    >
      <CommonImage
        src={src}
        alt={alt}
        width={80}
        height={80}
        radius="rounded-xl"
      />
      <button
        type="button"
        aria-label={`${alt} 삭제`}
        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-gray-50 text-gray-200"
        onClick={onRemove}
      >
        <XIcon aria-hidden />
      </button>
    </div>
  );
};
