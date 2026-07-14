'use client';

import { useMutation } from '@tanstack/react-query';

import { IMAGE_MUTATION_OPTIONS } from '@/shared/api/image';

export const useImageUpload = () => {
  const mutation = useMutation(IMAGE_MUTATION_OPTIONS.UPLOAD());

  return {
    uploadImage: mutation.mutateAsync,
    isUploading: mutation.isPending,
    uploadError: mutation.error,
    resetUpload: mutation.reset,
  };
};
