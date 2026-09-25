'use client';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

interface CourseCurrentLocationMarkerProps {
  position: CourseMapCenter;
}

export const CourseCurrentLocationMarker = ({
  position,
}: CourseCurrentLocationMarkerProps) => {
  return (
    <AdvancedMarker position={position} title="내 위치" zIndex={10}>
      <div className="bg-mint-300 size-5 rounded-full border-3 border-white shadow-[0_1px_4px_0_rgba(0,0,0,0.35)]" />
    </AdvancedMarker>
  );
};
