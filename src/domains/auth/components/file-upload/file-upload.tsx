'use client';

import { UploadIcon } from '@/shared/components/icons';

export const FileUpload = () => {
  return (
    <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-500 p-4">
      <input type="file" accept="image/*, .pdf" className="sr-only" />
      <span className="text-gray-200">
        <UploadIcon className="size-15" />
      </span>
      <span className="text-body-r-14 text-gray-500">
        파일 업로드 (PDF/이미지)
      </span>
    </label>
  );
};
