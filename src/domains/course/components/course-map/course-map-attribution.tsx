'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { type RefObject, useEffect } from 'react';

interface CourseMapAttributionProps {
  bottomSheetRef: RefObject<HTMLDivElement | null>;
}

const SNAP_ANIMATION_TRACKING_MS = 600;

export const CourseMapAttribution = ({
  bottomSheetRef,
}: CourseMapAttributionProps) => {
  const map = useMap();

  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!map || !sheet) return;

    const mapElement: HTMLElement = map.getDiv();
    const originalTranslations = new Map<
      HTMLElement,
      { value: string; priority: string }
    >();
    let targets: HTMLElement[] = [];
    let frameId = 0;
    let trackUntil = 0;
    let needsDiscovery = true;

    // Google has no attribution-position API. Keep the original DOM and only
    // translate its bottom-anchored containers; selectors may change upstream.
    const discoverTargets = () => {
      const root = mapElement.querySelector('.gm-style');
      if (!root) return;

      const containers = new Set<HTMLElement>();
      root
        .querySelectorAll<HTMLElement>(
          '.gm-style-cc, img[alt="Google"], img[alt="Google Maps"]',
        )
        .forEach((element) => {
          let container: HTMLElement | null = element;
          while (container && container !== root) {
            if (
              container.style.position === 'absolute' &&
              container.style.bottom === '0px'
            ) {
              containers.add(container);
              break;
            }
            container = container.parentElement;
          }
        });

      targets = [...containers];
      targets.forEach((element) => {
        if (originalTranslations.has(element)) return;
        originalTranslations.set(element, {
          value: element.style.getPropertyValue('translate'),
          priority: element.style.getPropertyPriority('translate'),
        });
      });
      originalTranslations.forEach((_, element) => {
        if (!element.isConnected) originalTranslations.delete(element);
      });
    };

    const updatePosition = () => {
      const mapBounds = mapElement.getBoundingClientRect();
      const sheetBounds = sheet.getBoundingClientRect();
      const overlapsMap =
        sheetBounds.width > 0 &&
        sheetBounds.height > 0 &&
        sheetBounds.left < mapBounds.right &&
        sheetBounds.right > mapBounds.left &&
        sheetBounds.top < mapBounds.bottom &&
        sheetBounds.bottom > mapBounds.top;
      const offset = overlapsMap
        ? Math.max(
            0,
            mapBounds.bottom - Math.max(mapBounds.top, sheetBounds.top),
          )
        : 0;
      const translation = `0px ${-offset}px`;

      targets.forEach((element) => {
        if (element.style.translate !== translation) {
          element.style.translate = translation;
        }
      });
    };

    const tick = () => {
      frameId = 0;
      if (needsDiscovery) {
        discoverTargets();
        needsDiscovery = false;
      }
      updatePosition();
      if (performance.now() < trackUntil) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const trackPosition = () => {
      trackUntil = performance.now() + SNAP_ANIMATION_TRACKING_MS;
      if (!frameId) frameId = requestAnimationFrame(tick);
    };
    const sheetObserver = new MutationObserver(trackPosition);
    sheetObserver.observe(sheet, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-state'],
    });
    const mapObserver = new MutationObserver(() => {
      needsDiscovery = true;
      trackPosition();
    });
    mapObserver.observe(mapElement, { childList: true, subtree: true });
    const resizeObserver = new ResizeObserver(trackPosition);
    resizeObserver.observe(mapElement);
    resizeObserver.observe(sheet);
    window.addEventListener('resize', trackPosition);
    trackPosition();

    return () => {
      cancelAnimationFrame(frameId);
      sheetObserver.disconnect();
      mapObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', trackPosition);
      originalTranslations.forEach(({ value, priority }, element) => {
        if (value) element.style.setProperty('translate', value, priority);
        else element.style.removeProperty('translate');
      });
    };
  }, [bottomSheetRef, map]);

  return null;
};
