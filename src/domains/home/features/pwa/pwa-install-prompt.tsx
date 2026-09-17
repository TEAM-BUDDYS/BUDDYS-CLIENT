'use client';

import { PwaBottomSheet } from '@/domains/home/components/pwa/pwa-bottom-sheet';
import { usePwaInstallPrompt } from '@/domains/home/hooks/use-pwa-install-prompt';

export const PwaInstallPrompt = () => {
  const { isOpen, handleDismiss, handleShowGuide } = usePwaInstallPrompt();

  return (
    <PwaBottomSheet
      open={isOpen}
      onClose={handleDismiss}
      onShowPwaGuide={handleShowGuide}
    />
  );
};
