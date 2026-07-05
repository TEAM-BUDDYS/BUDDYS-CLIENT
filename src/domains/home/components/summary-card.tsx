import Image from 'next/image';

import { CardDate } from '@/shared/components/ui/card/card-date';

interface SummaryCardProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export const SummaryCard = ({
  title,
  content,
  startDate,
  endDate,
  image,
}: SummaryCardProps) => {
  return (
    <article className="flex gap-4">
      {image && (
        <Image
          src={image}
          alt={`${title} 썸네일`}
          width={108}
          height={108}
          unoptimized
          className="size-18 rounded-xl object-cover"
        />
      )}
      <section className="flex flex-col gap-2">
        <div className="flex w-46.25 flex-col gap-1">
          <header className="text-body-sb-16 truncate text-gray-800">
            {title}
          </header>
          <p className="text-caption-m-12 truncate text-gray-500">{content}</p>
        </div>
        <CardDate startDate={startDate} endDate={endDate} />
      </section>
    </article>
  );
};
