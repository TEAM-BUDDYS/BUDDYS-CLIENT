import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://buddys.co.kr'),
  title: 'BUDDYS',
  description: '버디와 함께, 연결부터 기록까지',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'BUDDYS',
    title: 'BUDDYS',
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
      </body>
    </html>
  );
}
