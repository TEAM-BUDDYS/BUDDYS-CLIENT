import Link from 'next/link';

import type { DisplayablePreferencePost } from '@/domains/home/model/preference-buddy';
import { CardDate } from '@/shared/components/ui/card/card-date';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';
import { ROUTES } from '@/shared/config';

interface SummaryCardProps {
  post: DisplayablePreferencePost;
}

export const SummaryCard = ({ post }: SummaryCardProps) => {
  return (
    <article>
      <Link
        href={ROUTES.POST.DETAIL(post.postId)}
        className="flex h-20 justify-between"
      >
        <section className="flex flex-col gap-2">
          <div className="flex w-57.5 flex-col gap-1">
            <header className="text-body-sb-16 truncate text-gray-800">
              {post.title}
            </header>
            <p className="text-caption-m-12 truncate text-gray-500">
              {post.content}
            </p>
          </div>
          <CardDate startDate={post.startDate} endDate={post.endDate} />
        </section>
        {post.thumbnailImageUrl && (
          <CommonImage
            src={post.thumbnailImageUrl}
            alt={`${post.title} 썸네일`}
            width={80}
            height={80}
            radius="rounded-xl"
          />
        )}
      </Link>
    </article>
  );
};
