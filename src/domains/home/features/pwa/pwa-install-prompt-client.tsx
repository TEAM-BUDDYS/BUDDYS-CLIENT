'use client';

import dynamic from 'next/dynamic';

export const PwaInstallPromptClient = dynamic(
  () =>
    import('./pwa-install-prompt').then((module) => module.PwaInstallPrompt),
  {
    ssr: false,
    loading: () => null,
  },
);
