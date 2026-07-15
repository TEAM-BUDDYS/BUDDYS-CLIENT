import { PostCreateFlow } from '@/domains/posts/features/post-create/post-create-flow';
import { AsyncBoundary } from '@/shared/components/ui';

export default function PostsPage() {
  return (
    <AsyncBoundary>
      <PostCreateFlow />
    </AsyncBoundary>
  );
}
