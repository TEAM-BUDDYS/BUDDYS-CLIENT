import { SettingsContent } from '@/domains/profile/components/settings-content/settings-content';
import { Header } from '@/shared/components/layout';

export default function SettingsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header content="설정" contentAlign="center" hasBackButton />
      <SettingsContent />
    </main>
  );
}
