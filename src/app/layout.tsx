import './globals.css';

import type { Metadata } from 'next';

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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
