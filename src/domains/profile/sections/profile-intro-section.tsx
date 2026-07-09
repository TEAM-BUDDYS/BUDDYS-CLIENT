'use client';

import { Button } from '@/shared/components/ui';

import { ProfileBio } from '../components/profile-bio/profile-bio';

type ProfileIntroSectionProps =
  | {
      viewerType: 'me';
      bio?: string | null;
      onEditClick: () => void;
    }
  | {
      viewerType: 'other';
      bio?: string | null;
      onChatClick: () => void;
    }
  | {
      viewerType: 'withdrawn';
      bio?: string | null;
    };

export const ProfileIntroSection = (props: ProfileIntroSectionProps) => {
  const { bio, viewerType } = props;

  return (
    <div className="flex w-full flex-col gap-3">
      {bio ? <ProfileBio bio={bio} /> : null}

      {viewerType === 'withdrawn' ? (
        <Button variant="secondary" align="center" disabled>
          탈퇴한 회원입니다
        </Button>
      ) : viewerType === 'me' ? (
        <Button variant="secondary" align="center" onClick={props.onEditClick}>
          프로필 수정
        </Button>
      ) : (
        <Button variant="secondary" align="center" onClick={props.onChatClick}>
          채팅하기
        </Button>
      )}
    </div>
  );
};
