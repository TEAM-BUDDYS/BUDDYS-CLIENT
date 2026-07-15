import { OnboardFlow } from '@/domains/onboarding/features/onboard/onboard-flow';
import { AsyncBoundary } from '@/shared/components/ui';

export default function OnboardingPage() {
  return (
    <AsyncBoundary>
      <OnboardFlow />
    </AsyncBoundary>
  );
}
