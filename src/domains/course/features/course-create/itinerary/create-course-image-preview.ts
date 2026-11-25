const PREVIEW_MAX_DIMENSION = 320;

export const createCourseImagePreview = async (
  file: File,
  signal?: AbortSignal,
): Promise<string> => {
  signal?.throwIfAborted();

  const originalUrl = URL.createObjectURL(file);
  const image = new Image();
  const canvas = document.createElement('canvas');

  try {
    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        image.onload = null;
        image.onerror = null;
        signal?.removeEventListener('abort', handleAbort);
      };
      const handleAbort = () => {
        cleanup();
        image.src = '';
        reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
      };

      image.onload = () => {
        cleanup();
        resolve();
      };
      image.onerror = () => {
        cleanup();
        reject(new Error('사진을 불러오지 못했어요.'));
      };
      signal?.addEventListener('abort', handleAbort, { once: true });
      image.src = originalUrl;
    });

    signal?.throwIfAborted();

    const { naturalWidth: width, naturalHeight: height } = image;

    if (width <= 0 || height <= 0) {
      throw new Error('사진 크기를 확인할 수 없어요.');
    }

    const scale = Math.min(1, PREVIEW_MAX_DIMENSION / Math.max(width, height));
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('사진 미리보기를 만들 수 없어요.');
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const preview = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('사진 미리보기를 만들 수 없어요.'));
          }
        },
        'image/webp',
        0.8,
      );
    });

    signal?.throwIfAborted();

    return URL.createObjectURL(preview);
  } finally {
    image.onload = null;
    image.onerror = null;
    image.src = '';
    URL.revokeObjectURL(originalUrl);
    canvas.width = 0;
    canvas.height = 0;
  }
};
