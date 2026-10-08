import { FilterExplore } from '@/domains/course/features/customized-explore/filter-explore';
import { SuggestExplore } from '@/domains/course/features/customized-explore/suggest-explore';

interface CustomizedCourseExplorePageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function CustomizedCourseExplorePage({
  searchParams,
}: CustomizedCourseExplorePageProps) {
  const { type } = await searchParams;

  return type === 'suggest' ? <SuggestExplore /> : <FilterExplore />;
}
