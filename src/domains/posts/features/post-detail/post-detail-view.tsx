import { useState } from 'react';

import { StartChatButton } from '@/domains/chat/features/start-chat/start-chat-button';
import { PostDetailComments } from '@/domains/posts/features/post-detail/post-detail-comments';
import type { PostDetail } from '@/domains/posts/model/post-detail';
import { PostDetailConditionSection } from '@/domains/posts/sections/post-detail-condition-section';
import { PostDetailContentSection } from '@/domains/posts/sections/post-detail-content-section';
import { MoreIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

interface PostDetailViewProps {
  post: PostDetail;
}

export const PostDetailView = ({ post }: PostDetailViewProps) => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-white">
      <div className="sticky top-0 z-20 bg-white">
        <Header
          hasBackButton
          right={
            <button
              aria-label="게시물 메뉴"
              className="flex size-11 items-center justify-center text-gray-800"
              type="button"
              onClick={() => setIsComingSoonOpen(true)}
            >
              <MoreIcon className="size-6" />
            </button>
          }
        />
      </div>

      <main className="flex flex-col gap-10 px-4 pt-4 pb-35">
        <PostDetailContentSection post={post} />

        <div className="border-t border-gray-100 pt-4">
          <PostDetailConditionSection post={post} />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <PostDetailComments
            postId={post.postId}
            viewCount={post.viewCount}
            commentCount={post.commentCount}
          />
        </div>
      </main>

      {!post.isMine && (
        <div className="pointer-events-none fixed bottom-28.5 left-1/2 z-20 flex w-full max-w-107.5 -translate-x-1/2 justify-end px-4">
          <StartChatButton participantUserId={post.author.userId} />
        </div>
      )}

      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </div>
  );
};
