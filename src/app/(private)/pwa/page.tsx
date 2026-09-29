import { PwaGuide } from '@/domains/home/features/pwa/pwa-guide';
import { Header } from '@/shared/components/layout';

export default function PwaPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header hasBackButton />
      <main className="flex flex-1 flex-col justify-center px-4 pb-4">
        <PwaGuide />
      </main>
    </div>
  );
}
