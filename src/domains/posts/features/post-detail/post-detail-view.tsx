import { PostDetailComments } from '@/domains/posts/features/post-detail/post-detail-comments';
import type { PostDetailComment } from '@/domains/posts/model/comment';
import type { PostDetail } from '@/domains/posts/model/post-detail';
import { PostDetailConditionSection } from '@/domains/posts/sections/post-detail-condition-section';
import { PostDetailContentSection } from '@/domains/posts/sections/post-detail-content-section/post-detail-content-section';
import { MoreIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';

interface PostDetailViewProps {
  post: PostDetail;
  comments: PostDetailComment[];
}

export const PostDetailView = ({ post, comments }: PostDetailViewProps) => {
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
            viewCount={post.viewCount}
            commentCount={post.commentCount}
            comments={comments}
          />
        </div>
      </main>
    </div>
  );
};
