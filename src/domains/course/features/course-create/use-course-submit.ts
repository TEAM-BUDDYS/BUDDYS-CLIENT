'use client';

import { useMutation } from '@tanstack/react-query';
import { isHTTPError, isNetworkError, isTimeoutError } from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type { CourseErrorResponse } from '@/domains/course/api/type';
import { useImageUpload, validateImageFile } from '@/shared/api/image';
import { ROUTES } from '@/shared/config';

import { convertCourseCreateValueToRequest } from './course-create-payload';
import type { CourseCreateValue } from './model';

const getCourseSubmitErrorMessage = (error: unknown) => {
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

    return response?.message || '코스를 등록하지 못했습니다.';
  }

  return error instanceof Error ? error.message : '코스를 등록하지 못했습니다.';
};

export const useCourseSubmit = () => {
  const router = useRouter();
  const { uploadImage } = useImageUpload();
  const createCourseMutation = useMutation(COURSE_MUTATION_OPTIONS.CREATE());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );

  const clearSubmitError = () => {
    setSubmitErrorMessage(null);
  };

  const uploadDayImages = async (value: CourseCreateValue) => {
    value.days
      .flatMap(({ images }) => images.map(({ file }) => file))
      .forEach(validateImageFile);

    const dayImageUrls: string[][] = [];

    for (const day of value.days) {
      const uploadResults = await Promise.allSettled(
        day.images.map(({ file }) =>
          uploadImage({ file, imageDomain: 'COURSE' }),
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
      const payload = convertCourseCreateValueToRequest(value, dayImageUrls);
      const courseId = await createCourseMutation.mutateAsync(payload);

      router.replace(ROUTES.COURSE.DETAIL(courseId));
    } catch (error) {
      setSubmitErrorMessage(getCourseSubmitErrorMessage(error));
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
