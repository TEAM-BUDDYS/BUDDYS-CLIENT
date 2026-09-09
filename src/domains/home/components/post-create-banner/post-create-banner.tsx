import Link from 'next/link';

import { ChevronRightIcon, PenIcon } from '@/shared/components/icons';
import { ROUTES } from '@/shared/config';

export const PostCreateBanner = () => {
  return (
    <Link
      href={ROUTES.POST.ROOT}
      className="focus-visible:outline-mint-300 flex w-full items-center justify-between rounded-xl bg-gray-50 px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.75">
        <p className="text-body-sb-14 w-full truncate text-gray-800">
          나와 맞는 버디를 모집해보세요
        </p>
        <div className="flex items-center gap-1">
          <span className="text-caption-m-12 text-gray-500">
            게시물 작성하기
          </span>
          <span className="flex size-3 items-center justify-center rounded-full bg-gray-500 text-white">
            <ChevronRightIcon className="size-2" />
          </span>
        </div>
      </div>

      <PenIcon className="size-10.5 shrink-0" />
    </Link>
  );
};
