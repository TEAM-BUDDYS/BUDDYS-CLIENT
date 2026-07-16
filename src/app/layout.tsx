import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { GoogleAnalytics } from '@/shared/analytics/google-analytics';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

import { Providers } from './providers';

const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const isGoogleAnalyticsEnabled =
  process.env.NODE_ENV === 'production' &&
  Boolean(
    googleAnalyticsId && GOOGLE_ANALYTICS_ID_PATTERN.test(googleAnalyticsId),
  );

export const metadata: Metadata = {
  metadataBase: new URL('https://buddys.co.kr'),
  title: 'buddys | 교환학생 동행 매칭 서비스',
  description: '버디와 함께, 연결부터 기록까지',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'buddys | 교환학생 동행 매칭 서비스',
    title: 'buddys | 교환학생 동행 매칭 서비스',
    description: '버디와 함께, 연결부터 기록까지',
    images: [
      {
        url: '/images/og_image.png',
        width: 2400,
        height: 1260,
        alt: 'BUDDYS',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-dvh">
        <div className="mx-auto min-h-dvh w-full max-w-[430px] min-w-[375px] bg-white">
          <Providers>{children}</Providers>
        </div>
        {isGoogleAnalyticsEnabled && googleAnalyticsId && (
          <GoogleAnalytics measurementId={googleAnalyticsId} />
        )}
      </body>
    </html>
  );
}
