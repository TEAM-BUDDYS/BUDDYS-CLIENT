import { SettingsContent } from '@/domains/profile/components/settings-content/settings-content';
import { Header } from '@/shared/components/layout';

export default function SettingsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header
        content={<h1 className="text-title-b-18 text-gray-800">설정</h1>}
        contentAlign="center"
        hasBackButton
      />
      <SettingsContent />
    </main>
  );
}
