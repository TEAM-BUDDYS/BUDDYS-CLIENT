'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

interface CourseMapCameraProps {
  center: CourseMapCenter | null;
  initialCenter?: CourseMapCenter | null;
  bottomOverlayRatio?: number;
  bottomOverlayHeight?: number;
  onVisibleCenterChange?: (center: CourseMapCenter) => void;
  preserveCamera?: boolean;
  requestId?: number;
}

export const CourseMapCamera = ({
  center,
  initialCenter = null,
  bottomOverlayRatio = 0,
  bottomOverlayHeight = 0,
  onVisibleCenterChange,
  preserveCamera = false,
  requestId = 0,
}: CourseMapCameraProps) => {
  const map = useMap();
  const handledCenterKeyRef = useRef<string | null>(null);
  const handledRequestIdRef = useRef(0);

  useEffect(() => {
    if (!map || !onVisibleCenterChange) return;

    const updateVisibleCenter = () => {
      const cameraCenter = map.getCenter();
      const projection = map.getProjection();
      const zoom = map.getZoom();
      if (!cameraCenter || !projection || zoom === undefined) return;

      const bounds = map.getDiv().getBoundingClientRect();
      const overlayTop =
        bottomOverlayRatio > 0
          ? window.innerHeight * (1 - bottomOverlayRatio)
          : window.innerHeight - bottomOverlayHeight;
      const visibleBottom = Math.min(
        bounds.bottom,
        Math.max(bounds.top, overlayTop),
      );

      const visibleTop = Math.min(bounds.top + 100, visibleBottom);
      const pixelOffset =
        (visibleTop + visibleBottom) / 2 - (bounds.top + bounds.bottom) / 2;
      const point = projection.fromLatLngToPoint(cameraCenter);
      if (!point) return;

      const visiblePoint = Object.create(point) as typeof point;
      visiblePoint.y = point.y + pixelOffset / 2 ** zoom;
      const visibleCenter = projection.fromPointToLatLng(visiblePoint);
      if (visibleCenter) onVisibleCenterChange(visibleCenter.toJSON());
    };

    const listeners = [
      map.addListener('bounds_changed', updateVisibleCenter),
      map.addListener('projection_changed', updateVisibleCenter),
      map.addListener('idle', updateVisibleCenter),
    ];
    window.addEventListener('resize', updateVisibleCenter);
    updateVisibleCenter();

    return () => {
      listeners.forEach((listener) => listener.remove());
      window.removeEventListener('resize', updateVisibleCenter);
    };
  }, [bottomOverlayHeight, bottomOverlayRatio, map, onVisibleCenterChange]);

  useEffect(() => {
    const target =
      center ?? (handledCenterKeyRef.current === null ? initialCenter : null);
    if (!target) return;

    const isExplicitRequest = requestId !== handledRequestIdRef.current;
    if (!map || (preserveCamera && !isExplicitRequest)) return;

    const centerKey = `${target.lat}:${target.lng}:${bottomOverlayRatio}`;

    if (handledCenterKeyRef.current === centerKey && !isExplicitRequest) return;

    if (bottomOverlayRatio <= 0) {
      map.panTo(target);
      handledCenterKeyRef.current = centerKey;
      handledRequestIdRef.current = requestId;
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
      map.panTo(target);
      handledCenterKeyRef.current = centerKey;
      handledRequestIdRef.current = requestId;
      return;
    }

    const panToVisibleCenter = () => {
      const projection = map.getProjection();
      const zoom = map.getZoom();

      if (!projection || zoom === undefined) return false;

      const centerPoint = projection.fromLatLngToPoint(target);

      if (!centerPoint) {
        map.panTo(target);
        return true;
      }

      const pixelOffset = coveredMapHeight / 2 - 50;
      const adjustedPoint = Object.create(centerPoint) as typeof centerPoint;
      adjustedPoint.y = centerPoint.y + pixelOffset / 2 ** zoom;
      const adjustedCenter = projection.fromPointToLatLng(adjustedPoint);

      map.panTo(adjustedCenter ?? target);
      return true;
    };

    if (panToVisibleCenter()) {
      handledCenterKeyRef.current = centerKey;
      handledRequestIdRef.current = requestId;
      return;
    }

    const projectionListener = map.addListener('projection_changed', () => {
      if (!panToVisibleCenter()) return;

      handledCenterKeyRef.current = centerKey;
      handledRequestIdRef.current = requestId;
      projectionListener.remove();
    });

    return () => projectionListener.remove();
  }, [
    bottomOverlayRatio,
    center,
    initialCenter,
    map,
    preserveCamera,
    requestId,
  ]);

  return null;
};
