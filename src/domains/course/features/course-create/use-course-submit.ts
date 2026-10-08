'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isHTTPError, isNetworkError, isTimeoutError } from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type { CourseErrorResponse } from '@/domains/course/api/type';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useImageUpload, validateImageFile } from '@/shared/api/image';
import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import {
  convertCourseCreateValueToRequest,
  convertCourseUpdateValueToRequest,
} from './course-create-payload';
import type { CourseCreateValue } from './model';

interface UseCourseSubmitParams {
  courseId?: number;
}

const getCourseSubmitErrorMessage = (error: unknown, isEditMode: boolean) => {
  const defaultMessage = `코스를 ${isEditMode ? '수정' : '등록'}하지 못했습니다.`;

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

    const response = error.data as CourseErrorResponse | undefined;

    return response?.message || defaultMessage;
  }

  return error instanceof Error ? error.message : defaultMessage;
};

export const useCourseSubmit = ({ courseId }: UseCourseSubmitParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { uploadImage } = useImageUpload();
  const createCourseMutation = useMutation(COURSE_MUTATION_OPTIONS.CREATE());
  const updateCourseMutation = useMutation(COURSE_MUTATION_OPTIONS.UPDATE());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );
  const isEditMode = courseId !== undefined;

  const clearSubmitError = () => {
    setSubmitErrorMessage(null);
  };

  const uploadDayImages = async (value: CourseCreateValue) => {
    value.days
      .flatMap(({ images }) =>
        images.flatMap((image) => (image.type === 'new' ? [image.file] : [])),
      )
      .forEach(validateImageFile);

    const dayImageUrls: string[][] = [];

    for (const day of value.days) {
      const uploadResults = await Promise.allSettled(
        day.images.map((image) =>
          image.type === 'existing'
            ? image.imageUrl
            : uploadImage({ file: image.file, imageDomain: 'COURSE' }),
        ),
      );
      const failedUploadResult = uploadResults.find(
        (result): result is PromiseRejectedResult =>
          result.status === 'rejected',
      );

      if (failedUploadResult) {
        throw failedUploadResult.reason;
      }

      dayImageUrls.push(
        uploadResults.flatMap((result) =>
          result.status === 'fulfilled' ? [result.value] : [],
        ),
      );
    }

    return dayImageUrls;
  };

  const submitCourse = async (value: CourseCreateValue) => {
    setIsSubmitting(true);
    clearSubmitError();

    try {
      const dayImageUrls = await uploadDayImages(value);

      if (isEditMode) {
        const payload = convertCourseUpdateValueToRequest(value, dayImageUrls);
        const updatedCourseId = await updateCourseMutation.mutateAsync({
          courseId,
          body: payload,
        });

        await queryClient.invalidateQueries({
          queryKey: COURSE_QUERY_KEY.DETAIL(updatedCourseId),
        });
        void queryClient.invalidateQueries({
          queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL(),
          refetchType: 'none',
        });
        showToast('코스가 수정되었어요', {
          bottomOffsetClassName: 'bottom-26.5',
        });
        router.replace(ROUTES.COURSE.DETAIL(updatedCourseId));
        return;
      }

      const payload = convertCourseCreateValueToRequest(value, dayImageUrls);
      const createdCourseId = await createCourseMutation.mutateAsync(payload);

      router.replace(ROUTES.COURSE.DETAIL(createdCourseId));
    } catch (error) {
      setSubmitErrorMessage(getCourseSubmitErrorMessage(error, isEditMode));
      setIsSubmitting(false);
    }
  };

  return {
    clearSubmitError,
    isSubmitting,
    submitCourse,
    submitErrorMessage,
  };
};
