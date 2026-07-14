import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { OnboardFlow } from '@/domains/onboarding/features/onboard/onboard-flow';
import { AsyncBoundary } from '@/shared/components/ui';

export default function OnboardingPage() {
  return (
    <AuthEntryGuard>
      <AsyncBoundary>
        <OnboardFlow />
      </AsyncBoundary>
    </AuthEntryGuard>
  );
}
