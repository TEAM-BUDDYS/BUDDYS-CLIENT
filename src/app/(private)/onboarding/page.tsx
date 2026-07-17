import { AsyncBoundary } from '@/shared/components/ui';

import { OnboardingClient } from './onboarding-client';

export default function OnboardingPage() {
  return (
    <AsyncBoundary>
      <OnboardingClient />
    </AsyncBoundary>
  );
}
