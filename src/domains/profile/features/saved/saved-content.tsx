'use client';

import { useState } from 'react';

import {
  type SavedCategory,
  savedCategoryItems,
} from '@/domains/profile/model/saved-category';
import { Filter } from '@/shared/components/ui';

import { SavedCourseList } from './saved-course-list';
import { SavedMagazineList } from './saved-magazine-list';
import { SavedPartnerList } from './saved-partner-list';
import { SavedPlaceList } from './saved-place-list';

const savedListByCategory = {
  PARTNER: SavedPartnerList,
  COURSE: SavedCourseList,
  PLACE: SavedPlaceList,
  MAGAZINE: SavedMagazineList,
} satisfies Record<SavedCategory, () => React.ReactNode>;

export const SavedContent = () => {
  const [category, setCategory] = useState<SavedCategory>('PARTNER');
  const SavedList = savedListByCategory[category];

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

      <div className="mt-6">
        <SavedList />
      </div>
    </div>
  );
};
