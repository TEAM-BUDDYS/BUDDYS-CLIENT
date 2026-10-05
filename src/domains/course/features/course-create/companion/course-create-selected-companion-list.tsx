import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';

import type { CourseCreateCompanion } from '../model';

interface CourseCreateSelectedCompanionListProps {
  companions: CourseCreateCompanion[];
  onRemove: (userId: number) => void;
}

export const CourseCreateSelectedCompanionList = ({
  companions,
  onRemove,
}: CourseCreateSelectedCompanionListProps) => {
  if (companions.length === 0) {
    return null;
  }

  return (
    <section aria-label="선택한 동행">
      <div className="flex scrollbar-none gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {companions.map((companion) => (
          <button
            key={companion.userId}
            aria-label={`${companion.nickname}님을 동행에서 제거`}
            className="flex h-[107px] w-17 shrink-0 flex-col items-center gap-1.5"
            type="button"
            onClick={() => onRemove(companion.userId)}
          >
            <CommonImage
              alt=""
              className="size-17 border border-gray-100"
              height={68}
              radius="rounded-full"
              src={companion.profileImageUrl || defaultProfileImage}
              unoptimized={Boolean(companion.profileImageUrl)}
              width={68}
              onError={(event) => {
                event.currentTarget.srcset = '';
                event.currentTarget.src = defaultProfileImage.src;
              }}
            />
            <span className="text-body-r-14 w-full truncate text-center text-gray-800">
              {companion.nickname}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
