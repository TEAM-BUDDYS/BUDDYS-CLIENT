import { KakaoIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';

export const KaKaoLoginButton = () => {
  return (
    <Button variant="kakao" align="center" icon={<KakaoIcon />} iconSize="lg">
      카카오로 시작하기
    </Button>
  );
};
