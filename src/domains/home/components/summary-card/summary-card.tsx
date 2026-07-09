import Link from 'next/link';

import { CardDate } from '@/shared/components/ui/card/card-date';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface SummaryCardProps {
  href: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export const SummaryCard = ({
  href,
  title,
  content,
  startDate,
  endDate,
  image,
}: SummaryCardProps) => {
  return (
    <article>
      <Link href={href} className="flex h-20 justify-between">
        <section className="flex flex-col gap-2">
          <div className="flex w-57.5 flex-col gap-1">
            <header className="text-body-sb-16 truncate text-gray-800">
              {title}
            </header>
            <p className="text-caption-m-12 truncate text-gray-500">
              {content}
            </p>
          </div>
          <CardDate startDate={startDate} endDate={endDate} />
        </section>
        {image && (
          <CommonImage
            src={image}
            alt={`${title} 썸네일`}
            width={80}
            height={80}
            unoptimized
            radius="rounded-xl"
          />
        )}
      </Link>
    </article>
  );
};
