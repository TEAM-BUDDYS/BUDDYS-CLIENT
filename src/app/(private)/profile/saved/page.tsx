import { Header } from '@/shared/components/layout';

export default function SavedPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header
        content={<h1 className="text-title-b-18 text-gray-800">저장</h1>}
        contentAlign="center"
        hasBackButton
      />
    </main>
  );
}
