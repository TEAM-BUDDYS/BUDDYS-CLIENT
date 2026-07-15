import type { MetadataRoute } from 'next';

import { ROUTES } from '@/shared/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: ROUTES.HOME,
    name: 'BUDDYS',
    short_name: 'BUDDYS',
    description: '버디와 함께, 연결부터 기록까지',
    start_url: ROUTES.HOME,
    scope: ROUTES.HOME,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00cfd7',
    lang: 'ko',
    icons: [
      {
        src: '/icons/buddys-pwa-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/buddys-pwa-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
