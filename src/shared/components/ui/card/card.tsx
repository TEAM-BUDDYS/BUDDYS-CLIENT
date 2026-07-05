import Image from 'next/image';

import { CardDate } from '@/shared/components/ui/card/card-date';
import { PostStatusTag, Tag } from '@/shared/components/ui/card/card-tag';

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
        <div className="flex w-45.5 flex-col gap-1">
          <header className="text-body-sb-16 truncate text-gray-800">
            {title}
          </header>
          <p className="text-caption-m-12 truncate text-gray-500">{content}</p>
        </div>
        <CardDate startDate={startDate} endDate={endDate} />
      </section>
      {image && (
        <Image
          src={image}
          alt={`${title} 썸네일`}
          width={108}
          height={108}
          unoptimized
          className="size-27 rounded-xl object-cover"
        />
      )}
    </article>
  );
};
