'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { CourseBottomSheetPosition } from '@/domains/course/components/course-bottom-sheet/course-bottom-sheet';
import type { CourseTabValue } from '@/domains/course/components/course-tab/course-tab';
import {
  type CurrentLocationStatus,
  useCurrentLocation,
} from '@/domains/course/hook/use-current-location';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import type { CourseMapCategory } from '@/domains/course/model/course-place';

interface CourseBrowseContextValue {
  bottomSheetPosition: CourseBottomSheetPosition;
  bottomSheetTab: CourseTabValue;
  currentLocation: CourseMapCenter | null;
  currentLocationStatus: CurrentLocationStatus;
  isBookmarkMode: boolean;
  isLocationActive: boolean;
  refetchCurrentLocation: () => Promise<CourseMapCenter | null>;
  searchKeyword: string;
  selectedCategory?: CourseMapCategory;
  selectedRecommendedCategoryId?: number;
  selectedRecommendedCountryId?: number;
  setBottomSheetPosition: Dispatch<SetStateAction<CourseBottomSheetPosition>>;
  setBottomSheetTab: Dispatch<SetStateAction<CourseTabValue>>;
  setIsBookmarkMode: Dispatch<SetStateAction<boolean>>;
  setIsLocationActive: Dispatch<SetStateAction<boolean>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<CourseMapCategory | undefined>>;
  setSelectedRecommendedCategoryId: Dispatch<
    SetStateAction<number | undefined>
  >;
  setSelectedRecommendedCountryId: Dispatch<SetStateAction<number | undefined>>;
}

interface CourseBrowseProviderProps {
  children: ReactNode;
}

const CourseBrowseContext = createContext<CourseBrowseContextValue | null>(
  null,
);

export const CourseBrowseProvider = ({
  children,
}: CourseBrowseProviderProps) => {
  const [bottomSheetPosition, setBottomSheetPosition] =
    useState<CourseBottomSheetPosition>('default');
  const [bottomSheetTab, setBottomSheetTab] =
    useState<CourseTabValue>('nearby');
  const [isBookmarkMode, setIsBookmarkMode] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseMapCategory>();
  const [selectedRecommendedCategoryId, setSelectedRecommendedCategoryId] =
    useState<number>();
  const [selectedRecommendedCountryId, setSelectedRecommendedCountryId] =
    useState<number>();
  const {
    currentLocation,
    status: currentLocationStatus,
    refetchCurrentLocation,
  } = useCurrentLocation({ requestOnMount: false });

  const value = useMemo(
    () => ({
      bottomSheetPosition,
      bottomSheetTab,
      currentLocation,
      currentLocationStatus,
      isBookmarkMode,
      isLocationActive,
      refetchCurrentLocation,
      searchKeyword,
      selectedCategory,
      selectedRecommendedCategoryId,
      selectedRecommendedCountryId,
      setBottomSheetPosition,
      setBottomSheetTab,
      setIsBookmarkMode,
      setIsLocationActive,
      setSearchKeyword,
      setSelectedCategory,
      setSelectedRecommendedCategoryId,
      setSelectedRecommendedCountryId,
    }),
    [
      bottomSheetPosition,
      bottomSheetTab,
      currentLocation,
      currentLocationStatus,
      isBookmarkMode,
      isLocationActive,
      refetchCurrentLocation,
      searchKeyword,
      selectedCategory,
      selectedRecommendedCategoryId,
      selectedRecommendedCountryId,
    ],
  );

  return (
    <CourseBrowseContext.Provider value={value}>
      {children}
    </CourseBrowseContext.Provider>
  );
};

export const useCourseBrowse = () => {
  const context = useContext(CourseBrowseContext);

  if (!context) {
    throw new Error('useCourseBrowse must be used within CourseBrowseProvider');
  }

  return context;
};
