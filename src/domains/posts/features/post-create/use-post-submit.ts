'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isHTTPError, isNetworkError, isTimeoutError } from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import type {
  CreatePostRequest,
  PostErrorResponse,
} from '@/domains/posts/api/type';
import {
  POST_QUERY_KEY,
  RECOMMENDATION_QUERY_KEY,
  USER_QUERY_KEY,
} from '@/shared/api';
import { useImageUpload, validateImageFile } from '@/shared/api/image';
import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import type { PostCreateImage } from './model';

interface UsePostSubmitParams {
  postId?: number;
}

const getPostSubmitErrorMessage = (error: unknown, isEditMode: boolean) => {
  const defaultMessage = `게시글을 ${isEditMode ? '수정' : '작성'}하지 못했습니다.`;

  if (isTimeoutError(error)) {
    return '요청 시간이 초과되었습니다. 다시 시도해 주세요.';
  }

  if (isNetworkError(error)) {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }

  if (isHTTPError(error)) {
    if (error.response.status >= 500) {
      return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }

    const response = error.data as PostErrorResponse | undefined;

    return response?.message || defaultMessage;
  }

  return error instanceof Error ? error.message : defaultMessage;
};

export const usePostSubmit = ({ postId }: UsePostSubmitParams) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { uploadImage } = useImageUpload();
  const createPostMutation = useMutation(POST_MUTATION_OPTIONS.CREATE());
  const updatePostMutation = useMutation(POST_MUTATION_OPTIONS.UPDATE());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );
  const isEditMode = postId !== undefined;

  const clearSubmitError = () => {
    setSubmitErrorMessage(null);
  };

  const submitPost = async (
    payload: CreatePostRequest,
    images: PostCreateImage[],
  ) => {
    setIsSubmitting(true);
    clearSubmitError();

    try {
      const newImageFiles = images.flatMap((image) =>
        image.type === 'new' ? [image.file] : [],
      );

      newImageFiles.forEach(validateImageFile);

      const uploadResults = await Promise.allSettled(
        newImageFiles.map((file) => uploadImage({ file, imageDomain: 'POST' })),
      );
      const failedUploadResult = uploadResults.find(
        (result): result is PromiseRejectedResult =>
          result.status === 'rejected',
      );

      if (failedUploadResult) {
        throw failedUploadResult.reason;
      }

      const uploadedImageUrls = uploadResults.flatMap((result) =>
        result.status === 'fulfilled' ? [result.value] : [],
      );
      const existingImageUrls = images.flatMap((image) =>
        image.type === 'existing' ? [image.imageUrl] : [],
      );
      const imageUrls = [...existingImageUrls, ...uploadedImageUrls];

      if (isEditMode) {
        const updatedPostId = await updatePostMutation.mutateAsync({
          postId,
          body: { ...payload, imageUrls },
        });

        await queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.ALL,
        });
        void Promise.all([
          queryClient.invalidateQueries({
            queryKey: RECOMMENDATION_QUERY_KEY.POSTS_ALL(),
            refetchType: 'none',
          }),
          queryClient.invalidateQueries({
            queryKey: [...USER_QUERY_KEY.ME(), 'posts'],
            refetchType: 'none',
          }),
        ]);
        showToast('게시글이 수정되었어요', {
          bottomOffsetClassName: 'bottom-26.5',
        });
        router.replace(ROUTES.POST.DETAIL(updatedPostId));
        return;
      }

      const createPostPayload =
        imageUrls.length > 0 ? { ...payload, imageUrls } : payload;
      const createdPostId =
        await createPostMutation.mutateAsync(createPostPayload);

      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.ALL,
        }),
        queryClient.invalidateQueries({
          queryKey: [...USER_QUERY_KEY.ME(), 'posts'],
          refetchType: 'none',
        }),
      ]);
      router.replace(ROUTES.POST.DETAIL(createdPostId));
    } catch (error) {
      setSubmitErrorMessage(getPostSubmitErrorMessage(error, isEditMode));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    clearSubmitError,
    isSubmitting,
    submitErrorMessage,
    submitPost,
  };
};
