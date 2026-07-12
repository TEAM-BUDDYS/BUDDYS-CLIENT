type SearchParamValue = boolean | number | string | null | undefined;

type SearchParams = Record<string, SearchParamValue | SearchParamValue[]>;

export const createSearchParams = (params?: SearchParams) => {
  if (!params) {
    return undefined;
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
};
