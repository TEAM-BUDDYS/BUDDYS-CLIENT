'use client';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

interface CourseMapMarkerProps {
  placeId: string;
  position: CourseMapCenter;
  onSelect?: (placeId: string) => void;
}

export const CourseMapMarker = ({
  placeId,
  position,
  onSelect,
}: CourseMapMarkerProps) => {
  return (
    <AdvancedMarker position={position} onClick={() => onSelect?.(placeId)}>
      <div className="relative h-10 w-8">
        <div className="absolute top-0 left-0 h-8 w-8 rotate-45 rounded-[50%_50%_0_50%] bg-[#ff5a5f] shadow-md" />
        <div className="absolute top-2.5 left-2.5 h-3 w-3 rounded-full bg-white" />
      </div>
    </AdvancedMarker>
  );
};
