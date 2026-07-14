import type { ReactNode } from 'react';

import {
  POST_AGE_CONDITION_LABELS,
  POST_COMPANION_TYPE_LABELS,
  POST_GENDER_CONDITION_LABELS,
} from '@/domains/posts/model/post-condition';
import type { PostDetail } from '@/domains/posts/model/post-detail';
import { Chip, FormLabel } from '@/shared/components/ui';

interface PostDetailConditionSectionProps {
  post: PostDetail;
}

interface ConditionGroupProps {
  title: string;
  children: ReactNode;
}

const ConditionGroup = ({ title, children }: ConditionGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel as="h2">{title}</FormLabel>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export const PostDetailConditionSection = ({
  post,
}: PostDetailConditionSectionProps) => {
  const { conditions } = post;
  const preferenceTags = [
    ...conditions.activityTags,
    ...conditions.interestTags,
    ...conditions.travelStyleTags,
  ];

  return (
    <section className="flex w-full flex-col gap-6">
      <ConditionGroup title="동행 조건">
        {conditions.ageConditions.map((ageCondition) => (
          <Chip key={ageCondition}>
            {POST_AGE_CONDITION_LABELS[ageCondition]}
          </Chip>
        ))}
        {conditions.genderConditions.map((genderCondition) => (
          <Chip key={genderCondition}>
            {POST_GENDER_CONDITION_LABELS[genderCondition]}
          </Chip>
        ))}
      </ConditionGroup>

      <ConditionGroup title="동행 유형">
        <Chip>{POST_COMPANION_TYPE_LABELS[conditions.travelType]}</Chip>
      </ConditionGroup>

      {preferenceTags.length > 0 && (
        <ConditionGroup title="취향 태그">
          {preferenceTags.map((tag) => (
            <Chip key={tag.tagId}>{tag.name}</Chip>
          ))}
        </ConditionGroup>
      )}
    </section>
  );
};
