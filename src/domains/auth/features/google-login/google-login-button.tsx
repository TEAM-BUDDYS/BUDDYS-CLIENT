'use client';

import { GoogleIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="login"
      align="center"
      icon={<GoogleIcon />}
      iconSize="lg"
      className="border border-gray-200 bg-white"
    >
      Google로 시작하기
    </Button>
  );
};
