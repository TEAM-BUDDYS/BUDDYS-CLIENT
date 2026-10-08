'use client';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import type { CourseMapCenter } from '@/domains/course/model/course-map';
import { CourseMarkerIcon } from '@/shared/components/icons';

interface CourseMapMarkerProps {
  placeId: string;
  position: CourseMapCenter;
  title: string;
  onSelect?: (placeId: string) => void;
}

export const CourseMapMarker = ({
  placeId,
  position,
  title,
  onSelect,
}: CourseMapMarkerProps) => {
  return (
    <AdvancedMarker
      position={position}
      title={title}
      onClick={onSelect ? () => onSelect(placeId) : undefined}
    >
      <CourseMarkerIcon className="size-6" />
    </AdvancedMarker>
  );
};
