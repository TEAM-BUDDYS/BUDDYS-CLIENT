import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { CustomizedExploreContent } from '@/domains/home/features/customized-explore/customized-explore-content';

interface CustomizedExploreProps {
  searchParams?: Promise<{
    keyword?: string | string[];
  }>;
}

export default async function CustomizedExplore({
  searchParams,
}: CustomizedExploreProps) {
  const params = await searchParams;
  const keyword = Array.isArray(params?.keyword)
    ? params.keyword[0]
    : params?.keyword;

  return (
    <AuthEntryGuard>
      <CustomizedExploreContent keyword={keyword} />
    </AuthEntryGuard>
  );
}
