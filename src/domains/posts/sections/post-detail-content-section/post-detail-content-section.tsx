import { PostDetailProfileHeader } from '@/domains/posts/components/post-detail-profile-header/post-detail-profile-header';
import type { PostDetail } from '@/domains/posts/model/post-detail';
import { CalendarIcon, LocationIcon, MyIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';
import { formatRelativeTime } from '@/shared/utils/format-relative-time';

interface PostDetailContentSectionProps {
  post: PostDetail;
}

interface PostDetailMetaItemProps {
  icon: React.ReactNode;
  label: string;
}

const AUTHOR_GENDER_LABELS: Record<PostDetail['author']['gender'], string> = {
  FEMALE: '여',
  MALE: '남',
};

const RECRUITMENT_COUNT_LABELS: Record<
  PostDetail['recruitmentCountType'],
  string
> = {
  ONE: '1명',
  THREE_OR_MORE: '3명 이상',
  TWO: '2명',
};

const formatPostDetailDateRange = (startDate: string, endDate: string) => {
  const formattedStartDate = formatMonthDayWithWeekday(startDate);
  const formattedEndDate = formatMonthDayWithWeekday(endDate);

  if (!formattedStartDate) {
    return '';
  }

  if (!formattedEndDate || startDate === endDate) {
    return formattedStartDate;
  }

  return `${formattedStartDate} ~ ${formattedEndDate}`;
};

const getAuthorDescription = (post: PostDetail) => {
  const relativeTime = formatRelativeTime(post.createdAt);
  const createdAtLabel =
    relativeTime || formatMonthDayWithWeekday(post.createdAt);

  return [
    post.author.ageRange,
    AUTHOR_GENDER_LABELS[post.author.gender],
    createdAtLabel,
  ]
    .filter(Boolean)
    .join(' · ');
};

const PostDetailMetaItem = ({ icon, label }: PostDetailMetaItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-4 shrink-0 items-center justify-center text-gray-500">
        {icon}
      </span>
      <span className="text-body-m-15 text-gray-800">{label}</span>
    </div>
  );
};

export const PostDetailContentSection = ({
  post,
}: PostDetailContentSectionProps) => {
  const imageUrl = post.imageUrls[0];
  const dateLabel = formatPostDetailDateRange(post.startDate, post.endDate);

  return (
    <section className="flex w-full flex-col gap-6">
      <PostDetailProfileHeader
        nickname={post.author.nickname}
        country={post.author.country}
        profileDescription={getAuthorDescription(post)}
        profileImageUrl={post.author.profileImageUrl ?? undefined}
        recruitmentStatus={post.recruitmentStatus}
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-title-b-20 text-gray-800">{post.title}</h1>

        {imageUrl && (
          <CommonImage
            src={imageUrl}
            alt={`${post.title} 이미지`}
            width={343}
            height={240}
            unoptimized
            radius="rounded-2xl"
            className="h-60 w-full"
          />
        )}

        <div className="flex flex-col gap-2">
          <PostDetailMetaItem
            icon={<LocationIcon className="size-4" />}
            label={post.city.name}
          />
          {dateLabel && (
            <PostDetailMetaItem
              icon={<CalendarIcon className="size-4" />}
              label={dateLabel}
            />
          )}
          <PostDetailMetaItem
            icon={<MyIcon className="size-4" />}
            label={RECRUITMENT_COUNT_LABELS[post.recruitmentCountType]}
          />
        </div>

        <p className="text-body-m-15 whitespace-pre-line text-gray-800">
          {post.content}
        </p>
      </div>
    </section>
  );
};
