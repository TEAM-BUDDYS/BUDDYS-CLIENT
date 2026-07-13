import { AsyncLoadingState, DelayedFallback } from '@/shared/components/ui';

export default function Loading() {
  return (
    <main>
      <DelayedFallback>
        <AsyncLoadingState className="min-h-dvh" />
      </DelayedFallback>
    </main>
  );
}
