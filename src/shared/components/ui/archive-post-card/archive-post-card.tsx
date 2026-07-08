import { CardDate } from '@/shared/components/ui/card/card-date';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface ArchivePostCardProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export const ArchivePostCard = ({
  title,
  content,
  startDate,
  endDate,
  image,
}: ArchivePostCardProps) => {
  return (
    <article className="flex w-full gap-3 rounded-xl border border-gray-200 p-3">
      <section className="flex min-h-24 min-w-0 flex-1 flex-col gap-3.75">
        <div className="flex w-full flex-col gap-1">
          <h3 className="text-body-sb-14 truncate text-gray-800">{title}</h3>
          <p className="text-caption-m-12 line-clamp-2 min-h-9 break-all text-gray-300">
            {content}
          </p>
        </div>
        <div className="mt-auto">
          <CardDate startDate={startDate} endDate={endDate} />
        </div>
      </section>
      {image && (
        <CommonImage
          src={image}
          alt={`${title} 썸네일`}
          width={96}
          height={96}
          unoptimized
          radius="rounded-lg"
          className="aspect-square"
        />
      )}
    </article>
  );
};
