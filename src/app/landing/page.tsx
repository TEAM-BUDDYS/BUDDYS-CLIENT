import { LandingFooter } from '@/domains/landing/components/landing-footer/landing-footer';
import { LandingMain } from '@/domains/landing/components/landing-main/landing-main';

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col px-4">
      <div className="flex flex-1 items-center justify-center">
        <LandingMain />
      </div>
      <LandingFooter />
    </main>
  );
}
