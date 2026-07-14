import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { PostCreateFlow } from '@/domains/posts/features/post-create/post-create-flow';
import { AsyncBoundary } from '@/shared/components/ui';

export default function PostsPage() {
  return (
    <AuthEntryGuard>
      <AsyncBoundary>
        <PostCreateFlow />
      </AsyncBoundary>
    </AuthEntryGuard>
  );
}
