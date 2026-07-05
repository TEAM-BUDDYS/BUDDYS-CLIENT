import { Card } from '@/shared/components/ui/card/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <Card
        title="함께 사이드 프로젝트 할 팀원을 찾아요"
        content="프론트엔드와 백엔드가 함께 성장할 수 있는 프로젝트를 준비하고 있어요."
        postStatus="RECRUITING"
        tagValue="한국"
        startDate="2027-03-01"
        endDate="2027-03-05"
        image="https://picsum.photos/108/108"
      />
    </main>
  );
}
