'use client';

import { useRouter } from 'next/navigation';

import { ProfileBadgeIcon, SettingIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';

import type { MyProfile } from '../../model/profile';
import { ContentSection } from '../../sections/content-section';
import { ProfileIntroSection } from '../../sections/profile-intro-section';
import { TagChipGroup } from '../tag-chip-group/tag-chip-group';
import { UserProfile } from '../user-profile/user-profile';

interface ProfilePageViewProps {
  profile: MyProfile;
}

export const ProfilePageView = ({ profile }: ProfilePageViewProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        content="내 프로필"
        right={
          <button
            aria-label="설정"
            type="button"
            onClick={() => router.push('/profile/settings')}
          >
            <SettingIcon className="size-6 text-gray-500" />
          </button>
        }
      />

      <main className="flex flex-1 flex-col items-center overflow-y-auto pt-9 pb-18">
        <UserProfile
          imageUrl={profile.imageUrl}
          nickname={profile.nickname}
          badgeIcon={
            profile.isVerified ? (
              <ProfileBadgeIcon className="size-6" />
            ) : undefined
          }
          badgeLabel={profile.isVerified ? '인증된 사용자' : undefined}
          className="px-4"
        />

        <TagChipGroup
          tags={profile.tags}
          minVisibleCount={3}
          className="mt-5.5 px-4"
        />

        <ProfileIntroSection
          viewerType="me"
          bio={profile.bio}
          onEditClick={() => router.push('/profile/edit')}
          className="mt-5.25 px-4"
        />

        <ContentSection
          posts={profile.posts}
          onCreateCourseClick={() => router.push('/courses')}
          className="mt-6 mb-27.75"
        />
      </main>

      <BottomNavigation className="fixed inset-x-0 bottom-0" />
    </div>
  );
};
