import { MyProfileContainer } from '@/domains/profile/components/my-profile-container/my-profile-container';
import { AsyncBoundary } from '@/shared/components/ui';

export default function ProfilePage() {
  return (
    <AsyncBoundary
      loadingState={{ title: '프로필을 불러오고 있어요' }}
      errorState={{
        title: '프로필을 불러오지 못했어요',
        description: '잠시 후 다시 시도해 주세요.',
      }}
    >
      <MyProfileContainer />
    </AsyncBoundary>
  );
}
