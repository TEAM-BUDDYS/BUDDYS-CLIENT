import { KaKaoLoginButton } from '@/domains/auth/components/kakao-login-button/kakao-login-button';
import { LoginMain } from '@/domains/auth/components/login-main/login-main';

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col px-4">
      <div className="flex flex-1 items-center justify-center">
        <LoginMain />
      </div>

      <footer className="w-full pb-4">
        <KaKaoLoginButton />
      </footer>
    </main>
  );
}
