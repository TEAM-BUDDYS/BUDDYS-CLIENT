import { ProfilePageView } from '@/domains/profile/components/profile-page-view/profile-page-view';
import type { MyProfile } from '@/domains/profile/model/profile';

const MOCK_PROFILE: MyProfile = {
  nickname: '테스트유저',
  isVerified: true,
  tags: [
    { id: 1, name: '여행' },
    { id: 2, name: '맛집' },
    { id: 3, name: '사진' },
    { id: 4, name: '같이가용' },
  ],
  bio: '안녕하세요, 테스트용 자기소개입니다.',
  posts: [],
};

export default function ProfilePage() {
  return <ProfilePageView profile={MOCK_PROFILE} />;
}
