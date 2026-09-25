import { useCallback, useEffect, useState } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

export type CurrentLocationStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseCurrentLocationOptions {
  requestOnMount?: boolean;
}

const getCurrentLocation = () =>
  new Promise<CourseMapCenter>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('현재 위치를 지원하지 않는 브라우저입니다.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      reject,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000 * 60 * 5,
      },
    );
  });

export const useCurrentLocation = ({
  requestOnMount = true,
}: UseCurrentLocationOptions = {}) => {
  const [currentLocation, setCurrentLocation] =
    useState<CourseMapCenter | null>(null);
  const [status, setStatus] = useState<CurrentLocationStatus>(
    requestOnMount ? 'loading' : 'idle',
  );
  const [error, setError] = useState<GeolocationPositionError | Error | null>(
    null,
  );

  const refetchCurrentLocation = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setStatus('success');
      return location;
    } catch (locationError) {
      setCurrentLocation(null);
      setError(
        locationError instanceof Error
          ? locationError
          : (locationError as GeolocationPositionError),
      );
      setStatus('error');
      return null;
    }
  }, []);

  useEffect(() => {
    if (!requestOnMount) return;

    void getCurrentLocation().then(
      (location) => {
        setCurrentLocation(location);
        setStatus('success');
      },
      (locationError: GeolocationPositionError | Error) => {
        setCurrentLocation(null);
        setError(locationError);
        setStatus('error');
      },
    );
  }, [requestOnMount]);

  return {
    currentLocation,
    status,
    error,
    refetchCurrentLocation,
  };
};
