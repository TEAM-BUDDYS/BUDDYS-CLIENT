import { ExchangeDocumentVerification } from '@/domains/verification/features/exchange-document-verification/exchange-document-verification';
import { getVerificationEntry } from '@/domains/verification/model/verification-entry';

interface ExchangeDocumentVerificationPageProps {
  searchParams: Promise<{ from?: string | string[] }>;
}

export default async function ExchangeDocumentVerificationPage({
  searchParams,
}: ExchangeDocumentVerificationPageProps) {
  const { from } = await searchParams;

  return (
    <ExchangeDocumentVerification entryPoint={getVerificationEntry(from)} />
  );
}
