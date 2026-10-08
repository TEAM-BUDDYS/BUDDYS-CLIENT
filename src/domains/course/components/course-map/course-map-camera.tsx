'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

interface CourseMapCameraProps {
  center: CourseMapCenter | null;
  bottomOverlayRatio?: number;
  preserveCamera?: boolean;
}

export const CourseMapCamera = ({
  center,
  bottomOverlayRatio = 0,
  preserveCamera = false,
}: CourseMapCameraProps) => {
  const map = useMap();
  const handledCenterKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!center) {
      handledCenterKeyRef.current = null;
      return;
    }

    if (!map || preserveCamera) return;

    const centerKey = `${center.lat}:${center.lng}`;

    if (handledCenterKeyRef.current === centerKey) return;

    if (bottomOverlayRatio <= 0) {
      map.panTo(center);
      handledCenterKeyRef.current = centerKey;
      return;
    }

    const mapBounds = map.getDiv().getBoundingClientRect();
    const overlayTop = window.innerHeight * (1 - bottomOverlayRatio);
    const visibleMapBottom = Math.min(
      mapBounds.bottom,
      Math.max(mapBounds.top, overlayTop),
    );
    const coveredMapHeight = mapBounds.bottom - visibleMapBottom;

    if (coveredMapHeight <= 0) {
      map.panTo(center);
      handledCenterKeyRef.current = centerKey;
      return;
    }

    const panToVisibleCenter = () => {
      const projection = map.getProjection();
      const zoom = map.getZoom();

      if (!projection || zoom === undefined) return false;

      const centerPoint = projection.fromLatLngToPoint(center);

      if (!centerPoint) {
        map.panTo(center);
        return true;
      }

      const pixelOffset = coveredMapHeight / 2 - 50;
      const adjustedPoint = Object.create(centerPoint) as typeof centerPoint;
      adjustedPoint.y = centerPoint.y + pixelOffset / 2 ** zoom;
      const adjustedCenter = projection.fromPointToLatLng(adjustedPoint);

      map.panTo(adjustedCenter ?? center);
      return true;
    };

    if (panToVisibleCenter()) {
      handledCenterKeyRef.current = centerKey;
      return;
    }

    const projectionListener = map.addListener('projection_changed', () => {
      if (!panToVisibleCenter()) return;

      handledCenterKeyRef.current = centerKey;
      projectionListener.remove();
    });

    return () => projectionListener.remove();
  }, [bottomOverlayRatio, center, map, preserveCamera]);

  return null;
};
