import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { OnboardFlow } from '@/domains/onboarding/features/onboard/onboard-flow';

export default function OnboardingPage() {
  return (
    <AuthEntryGuard>
      <OnboardFlow />
    </AuthEntryGuard>
  );
}
