import type { components, operations } from '@/types/schema';

export type GetSearchSuggestionsParams =
  operations['getSearchSuggestions']['parameters']['query'];

export type GetSearchSuggestionsResponse =
  components['schemas']['BaseResponseSearchSuggestionResponse'];
