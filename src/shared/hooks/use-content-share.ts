'use client';

import { useToast } from '@/shared/components/ui';

interface ShareContentParams {
  title: string;
  url: string;
}

const SHARE_TOAST_BOTTOM_OFFSET_CLASS_NAME = 'bottom-26.5';

const isShareCancelled = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('name' in error)) {
    return false;
  }

  return error.name === 'AbortError';
};

export const useContentShare = () => {
  const { showToast } = useToast();

  const shareContent = async ({ title, url }: ShareContentParams) => {
    const resolvedUrl = new URL(url, window.location.origin).toString();

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url: resolvedUrl });
        return;
      } catch (error) {
        if (isShareCancelled(error)) {
          return;
        }
      }
    }

    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API is not supported.');
      }

      await navigator.clipboard.writeText(resolvedUrl);
      showToast('링크가 복사되었어요.', {
        bottomOffsetClassName: SHARE_TOAST_BOTTOM_OFFSET_CLASS_NAME,
        variant: 'gray',
      });
    } catch {
      showToast('링크를 공유하지 못했어요. 다시 시도해 주세요.', {
        bottomOffsetClassName: SHARE_TOAST_BOTTOM_OFFSET_CLASS_NAME,
        variant: 'gray',
      });
    }
  };

  return { shareContent };
};
