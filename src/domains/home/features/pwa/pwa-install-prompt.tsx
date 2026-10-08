'use client';

import { PwaBottomSheet } from '@/domains/home/components/pwa/pwa-bottom-sheet';
import { usePwaInstallPrompt } from '@/domains/home/hooks/use-pwa-install-prompt';

import { usePwaPlatform } from '../../hooks/use-pwa-platform';

export const PwaInstallPrompt = () => {
  const platform = usePwaPlatform();

  const { isOpen, handleDismiss, handleShowGuide } = usePwaInstallPrompt();

  if (platform === null) {
    return null;
  }

  return (
    <PwaBottomSheet
      platform={platform}
      open={isOpen}
      onClose={handleDismiss}
      onShowPwaGuide={handleShowGuide}
    />
  );
};
