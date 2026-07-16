'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import {
  getGoogleAnalyticsCampaignConfig,
  normalizeAnalyticsPath,
} from './analytics-policy';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const getInitialPageReferrer = () => {
  if (!document.referrer) {
    return undefined;
  }

  try {
    const referrerUrl = new URL(document.referrer);

    if (referrerUrl.origin !== window.location.origin) {
      return referrerUrl.origin;
    }

    const normalizedReferrerPath = normalizeAnalyticsPath(referrerUrl.pathname);

    return normalizedReferrerPath
      ? `${referrerUrl.origin}${normalizedReferrerPath}`
      : referrerUrl.origin;
  } catch {
    return undefined;
  }
};

export const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();
  const analyticsPath = normalizeAnalyticsPath(pathname);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasInitializedRef = useRef(false);
  const lastTrackedPathnameRef = useRef<string | null>(null);
  const previousPageLocationRef = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsPath || hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      ((...args: GoogleTagArguments) => {
        window.dataLayer.push(args);
      });

    const campaignConfig = getGoogleAnalyticsCampaignConfig(
      window.location.search,
    );

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...campaignConfig,
    });
    setIsInitialized(true);
  }, [analyticsPath, measurementId]);

  useEffect(() => {
    if (
      !isInitialized ||
      typeof window.gtag !== 'function' ||
      lastTrackedPathnameRef.current === pathname
    ) {
      return;
    }

    lastTrackedPathnameRef.current = pathname;

    if (!analyticsPath) {
      return;
    }

    const pageLocation = `${window.location.origin}${analyticsPath}`;
    const pageReferrer =
      previousPageLocationRef.current ?? getInitialPageReferrer();

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: pageLocation,
      ...(pageReferrer && { page_referrer: pageReferrer }),
    });

    previousPageLocationRef.current = pageLocation;
  }, [analyticsPath, isInitialized, pathname]);

  if (!analyticsPath) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
};
