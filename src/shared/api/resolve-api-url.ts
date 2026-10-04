export const resolveApiUrl = (url?: string | null) => {
  if (!url?.startsWith('/')) return url;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return apiBaseUrl ? new URL(url, apiBaseUrl).toString() : url;
};
