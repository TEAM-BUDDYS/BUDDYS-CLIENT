import emptyStateImage from '@/shared/assets/empty-state.svg';
import EmptyState from '@/shared/components/ui/empty-state/empty-state';

export default function TestPage() {
  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-title-sb-18">EmptyState 테스트</h1>
      <EmptyState
        imageSrc={emptyStateImage}
        imageAlt="빈 상태 일러스트"
        title="게시물을 찾을 수 없어요"
        description="검색 조건을 변경해 보세요"
      />
    </main>
  );
}
