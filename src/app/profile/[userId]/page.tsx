import { notFound } from 'next/navigation';

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { OtherProfileContainer } from '@/domains/profile/components/other-profile-container/other-profile-container';
import { AsyncBoundary } from '@/shared/components/ui';

interface OtherProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function OtherProfilePage({
  params,
}: OtherProfilePageProps) {
  const { userId } = await params;
  const parsedUserId = Number(userId);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    notFound();
  }

  return (
    <AuthEntryGuard>
      <AsyncBoundary
        loadingState={{ title: '프로필을 불러오고 있어요' }}
        errorState={{
          title: '프로필을 불러오지 못했어요',
          description: '잠시 후 다시 시도해 주세요.',
        }}
      >
        <OtherProfileContainer userId={parsedUserId} />
      </AsyncBoundary>
    </AuthEntryGuard>
  );
}
