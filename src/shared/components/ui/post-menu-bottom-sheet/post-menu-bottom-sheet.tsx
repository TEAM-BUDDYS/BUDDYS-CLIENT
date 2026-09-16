'use client';

import { EditIcon, SendIcon, TrashIcon } from '@/shared/components/icons';

import { BottomSheet } from '../bottom-sheet/bottom-sheet';
import { Button } from '../button/button';

type PostMenuAction = 'share' | 'edit' | 'delete';

interface PostMenuBottomSheetProps {
  open: boolean;
  isMine: boolean;
  onClose: () => void;
  onAction: (action: PostMenuAction) => void;
}

export const PostMenuBottomSheet = ({
  open,
  isMine,
  onClose,
  onAction,
}: PostMenuBottomSheetProps) => {
  const handleAction = (action: PostMenuAction) => {
    onClose();
    onAction(action);
  };

  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="게시글 메뉴">
      <div className="mx-4 mb-8.5 flex flex-col gap-4">
        <div className="overflow-hidden rounded-xl [&>button]:rounded-none">
          <Button
            variant="neutral"
            align="left"
            icon={<SendIcon />}
            onClick={() => handleAction('share')}
          >
            공유하기
          </Button>

          {isMine && (
            <>
              <Button
                variant="neutral"
                align="left"
                icon={<EditIcon />}
                onClick={() => handleAction('edit')}
              >
                수정하기
              </Button>

              <Button
                variant="neutral"
                align="left"
                icon={<TrashIcon />}
                onClick={() => handleAction('delete')}
              >
                삭제하기
              </Button>
            </>
          )}
        </div>

        <Button onClick={onClose}>닫기</Button>
      </div>
    </BottomSheet>
  );
};
