'use client';

import { useState } from 'react';

import {
  type SavedCategory,
  savedCategoryItems,
} from '@/domains/profile/model/saved-category';
import { Filter } from '@/shared/components/ui';

export const SavedContent = () => {
  const [category, setCategory] = useState<SavedCategory>('PARTNER');

  return (
    <div className="px-4 pt-4 pb-6">
      <div className="flex gap-2">
        {savedCategoryItems.map((categoryItem) => (
          <Filter
            key={categoryItem.key}
            label={categoryItem.label}
            pressed={category === categoryItem.key}
            onPress={() => setCategory(categoryItem.key)}
          />
        ))}
      </div>
    </div>
  );
};
