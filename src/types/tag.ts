import type { components } from './schema';

type TagResponse = components['schemas']['TagResponse'];

export type Tag = Pick<TagResponse, 'id' | 'name'>;
