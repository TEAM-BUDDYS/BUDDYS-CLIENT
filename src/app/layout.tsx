import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'BUDDYS',
  description: 'BUDDYS client application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-dvh">
        <div className="mx-auto min-h-dvh w-full max-w-[430px] min-w-[375px]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
