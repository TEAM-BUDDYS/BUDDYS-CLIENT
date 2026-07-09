import { LandingFooter } from '@/domains/landing/components/landing-footer';
import { MainSection } from '@/domains/landing/components/main-section/main-section';

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col px-4">
      <div className="flex flex-1 items-center justify-center">
        <MainSection />
      </div>
      <LandingFooter />
    </main>
  );
}
