import { Button } from '@/shared/components/ui';

import { ProfileBio } from '../components/profile-bio/profile-bio';

type ProfileViewerType = 'me' | 'other' | 'withdrawn';

interface ProfileIntroSectionProps {
  bio?: string | null;
  viewerType: ProfileViewerType;
  onEditClick?: () => void;
  onChatClick?: () => void;
}

export const ProfileIntroSection = ({
  bio,
  viewerType,
  onEditClick,
  onChatClick,
}: ProfileIntroSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {bio ? <ProfileBio bio={bio} /> : null}

      {viewerType === 'withdrawn' ? (
        <Button variant="secondary" align="center" disabled>
          탈퇴한 회원입니다
        </Button>
      ) : viewerType === 'me' ? (
        <Button variant="secondary" align="center" onClick={onEditClick}>
          프로필 수정
        </Button>
      ) : (
        <Button variant="secondary" align="center" onClick={onChatClick}>
          채팅하기
        </Button>
      )}
    </div>
  );
};
