import { MyProfileContainer } from '@/domains/profile/components/my-profile-container/my-profile-container';
import { AsyncBoundary, AsyncErrorState } from '@/shared/components/ui';

export default function ProfilePage() {
  return (
    <AsyncBoundary
      loadingState={{ title: '프로필을 불러오고 있어요' }}
      errorFallback={({ error, reset }) => (
        <AsyncErrorState
          title="프로필을 불러오지 못했어요"
          description={error instanceof Error ? error.message : undefined}
          onRetry={reset}
        />
      )}
    >
      <MyProfileContainer />
    </AsyncBoundary>
  );
}
