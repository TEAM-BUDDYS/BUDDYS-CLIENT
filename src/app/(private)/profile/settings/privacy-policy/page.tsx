import { PolicyContent } from '@/domains/profile/components/policy-content/policy-content';
import { PRIVACY_POLICY_SECTIONS } from '@/domains/profile/model/privacy-policy';
import { Header } from '@/shared/components/layout';

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header
        content={
          <h1 className="text-title-b-18 text-gray-800">개인정보 처리방침</h1>
        }
        contentAlign="center"
        hasBackButton
      />
      <PolicyContent sections={PRIVACY_POLICY_SECTIONS} />
    </main>
  );
}
