'use client';

import { useToast } from '@/shared/components/ui';
import { SHARE_ENTRY } from '@/shared/constants/share';

interface ShareContentParams {
  title: string;
  url: string;
  markAsShareEntry?: boolean;
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

  const shareContent = async ({
    title,
    url,
    markAsShareEntry = false,
  }: ShareContentParams) => {
    const resolvedUrl = new URL(url, window.location.origin);

    if (markAsShareEntry) {
      resolvedUrl.searchParams.set(SHARE_ENTRY.PARAM, SHARE_ENTRY.VALUE);
    }

    const shareUrl = resolvedUrl.toString();

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url: shareUrl });
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

      await navigator.clipboard.writeText(shareUrl);
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
