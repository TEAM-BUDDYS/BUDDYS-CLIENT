import { useEffect, useState } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<CourseMapCenter | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setCurrentLocation(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000 * 60 * 5,
      },
    );
  }, []);

  return currentLocation;
};
