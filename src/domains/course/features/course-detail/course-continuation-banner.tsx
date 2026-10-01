import Image from 'next/image';

import courseContinuationImage from '@/domains/course/assets/illustrations/course-continuation.svg';
import { ChevronRightIcon } from '@/shared/components/icons';

interface CourseContinuationBannerProps {
  onClick: () => void;
}

export const CourseContinuationBanner = ({
  onClick,
}: CourseContinuationBannerProps) => {
  return (
    <button
      type="button"
      className="focus-visible:outline-mint-300 flex w-full items-center justify-between rounded-xl bg-gray-50 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
      onClick={onClick}
    >
      <span className="flex min-w-0 flex-col gap-0.75">
        <strong className="text-body-sb-14 truncate text-gray-800">
          이 코스로 이어서 여행을 계획해볼까요?
        </strong>
        <span className="flex items-center gap-1">
          <span className="text-caption-m-12 text-gray-500">
            이어서 작성하기
          </span>
          <span className="flex size-3 items-center justify-center rounded-md bg-gray-500 text-white">
            <ChevronRightIcon className="size-2" />
          </span>
        </span>
      </span>

      <Image
        src={courseContinuationImage}
        alt=""
        width={48}
        height={42}
        className="shrink-0"
      />
    </button>
  );
};
