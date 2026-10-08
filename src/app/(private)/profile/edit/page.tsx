import { EditProfile } from '@/domains/profile/features/edit-profile/edit-profile';
import { Header } from '@/shared/components/layout';
import { AsyncBoundary } from '@/shared/components/ui';

export default function ProfileEditPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header content="프로필 수정" contentAlign="center" hasBackButton />
      <AsyncBoundary
        className="min-h-[calc(100dvh-60px)]"
        loadingState={{
          title: '프로필 정보를 조회하고 있어요',
        }}
        errorState={{
          title: '프로필 정보를 불러오지 못했어요',
          description: '잠시 후 다시 시도해 주세요',
        }}
      >
        <main className="flex-1 p-4">
          <EditProfile />
        </main>
      </AsyncBoundary>
    </div>
  );
}
