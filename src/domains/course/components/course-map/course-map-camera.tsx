'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

interface CourseMapCameraProps {
  center: CourseMapCenter | null;
}

export const CourseMapCamera = ({ center }: CourseMapCameraProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;

    map.panTo(center);
  }, [center, map]);

  return null;
};
