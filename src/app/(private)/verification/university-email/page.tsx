import { UniversityEmailVerificationFlow } from '@/domains/verification/features/university-email-verification/university-email-verification-flow';
import { getVerificationEntry } from '@/domains/verification/model/verification-entry';

interface UniversityEmailVerificationPageProps {
  searchParams: Promise<{ from?: string | string[] }>;
}

export default async function UniversityEmailVerificationPage({
  searchParams,
}: UniversityEmailVerificationPageProps) {
  const { from } = await searchParams;

  return (
    <UniversityEmailVerificationFlow entryPoint={getVerificationEntry(from)} />
  );
}
