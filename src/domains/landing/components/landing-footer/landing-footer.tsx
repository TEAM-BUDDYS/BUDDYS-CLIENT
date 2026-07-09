import Link from 'next/link';

import { Button } from '@/shared/components/ui';

export const LandingFooter = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-4 pb-4">
      <Link href={'/login'} className="w-full">
        <Button>시작하기</Button>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <p className="text-body-r-14 text-gray-500">이미 계정이 있나요?</p>
        <Link href={'/login'}>
          <button className="text-body-sb-14 text-gray-800">로그인</button>
        </Link>
      </div>
    </footer>
  );
};
