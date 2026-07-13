import { MyProfileContainer } from '@/domains/profile/components/my-profile-container/my-profile-container';
import { ProfileAsyncBoundary } from '@/domains/profile/components/profile-async-boundary/profile-async-boundary';

export default function ProfilePage() {
  return (
    <ProfileAsyncBoundary>
      <MyProfileContainer />
    </ProfileAsyncBoundary>
  );
}
