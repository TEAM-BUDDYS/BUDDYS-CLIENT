import { ExchangeVerification } from '@/domains/verification/features/exchange-verification/exchange-verification';
import { getVerificationEntry } from '@/domains/verification/model/verification-entry';

interface ExchangeVerificationPageProps {
  searchParams: Promise<{ from?: string | string[] }>;
}

export default async function ExchangeVerificationPage({
  searchParams,
}: ExchangeVerificationPageProps) {
  const { from } = await searchParams;

  return <ExchangeVerification entryPoint={getVerificationEntry(from)} />;
}
