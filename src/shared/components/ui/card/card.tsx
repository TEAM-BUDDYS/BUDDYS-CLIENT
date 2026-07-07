import { cn } from '@/lib/cn';
import { CardDate } from '@/shared/components/ui/card/card-date';
import { PostStatusTag, Tag } from '@/shared/components/ui/card/card-tag';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

import type { RecruitmentStatus } from './card-tag';

interface CardProps {
  title: string;
  content: string;
  postStatus: RecruitmentStatus;
  tagValue: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export const Card = ({
  title,
  content,
  postStatus,
  tagValue,
  startDate,
  endDate,
  image,
}: CardProps) => {
  return (
    <article className="flex justify-between">
      <section className="flex flex-col gap-2">
        <div className="flex gap-1.5">
          <PostStatusTag status={postStatus} />
          <Tag value={tagValue} />
        </div>
        <div className={cn('flex flex-col gap-1', image ? 'w-45.5' : 'w-57.5')}>
          <header className="text-body-sb-16 truncate text-gray-800">
            {title}
          </header>
          <p className="text-caption-m-12 truncate text-gray-500">{content}</p>
        </div>
        <CardDate startDate={startDate} endDate={endDate} />
      </section>
      {image && (
        <CommonImage
          src={image}
          alt={`${title} 썸네일`}
          width={100}
          height={100}
          unoptimized
          radius="rounded-xl"
        />
      )}
    </article>
  );
};
