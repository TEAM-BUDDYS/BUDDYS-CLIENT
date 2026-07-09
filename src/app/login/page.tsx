import { LoginMain } from '@/domains/auth/components/login-main/login-main';
import { KakaoIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col px-4">
      <div className="flex flex-1 items-center justify-center">
        <LoginMain />
      </div>

      <footer className="w-full pb-4">
        <Button
          variant="kakao"
          align="center"
          icon={<KakaoIcon />}
          iconSize="lg"
        >
          카카오로 시작하기
        </Button>
      </footer>
    </main>
  );
}
