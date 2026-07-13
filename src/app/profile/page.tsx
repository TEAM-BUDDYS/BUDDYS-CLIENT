import { MyProfileContainer } from '@/domains/profile/components/my-profile-container/my-profile-container';
import { AsyncBoundary } from '@/shared/components/ui';

export default function ProfilePage() {
  return (
    <AsyncBoundary
      loadingState={{ title: '프로필을 불러오고 있어요' }}
      errorState={{ title: '프로필을 불러오지 못했어요' }}
    >
      <MyProfileContainer />
    </AsyncBoundary>
  );
}
