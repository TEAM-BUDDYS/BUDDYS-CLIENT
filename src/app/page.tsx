import { CardProfile } from '@/domains/home/components/card-profile';

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-10">
      <CardProfile
        nickname="닉네임"
        country="한국"
        ageGroup="20대"
        matchingRate={100}
        imageUrl="https://picsum.photos/120/120"
      />
    </main>
  );
}
