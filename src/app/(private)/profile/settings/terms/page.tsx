import { PolicyContent } from '@/domains/profile/components/policy-content/policy-content';
import { TERMS_SECTIONS } from '@/domains/profile/model/terms';
import { Header } from '@/shared/components/layout';

export default function TermsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header
        content={<h1 className="text-title-b-18 text-gray-800">이용약관</h1>}
        contentAlign="center"
        hasBackButton
        className="sticky top-0 z-20"
      />
      <PolicyContent sections={TERMS_SECTIONS} />
    </main>
  );
}
