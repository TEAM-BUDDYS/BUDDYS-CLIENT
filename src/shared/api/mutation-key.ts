export const COURSE_MUTATION_KEY = {
  ALL: ['courses'] as const,
  UPDATE_BOOKMARK: () =>
    [...COURSE_MUTATION_KEY.ALL, 'update-bookmark'] as const,
};

export const POST_MUTATION_KEY = {
  ALL: ['posts'] as const,
  CREATE: () => [...POST_MUTATION_KEY.ALL, 'create'] as const,
  UPDATE_STATUS: () => [...POST_MUTATION_KEY.ALL, 'update-status'] as const,
  CREATE_COMMENT: () => [...POST_MUTATION_KEY.ALL, 'create-comment'] as const,
};
