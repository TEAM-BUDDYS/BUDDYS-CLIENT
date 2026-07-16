import { ROUTES } from '@/shared/config/routes';

const EXCLUDED_ANALYTICS_PATHS = new Set<string>([ROUTES.AUTH.KAKAO_CALLBACK]);

const DYNAMIC_ANALYTICS_PATHS = [
  {
    rootPath: ROUTES.POST.ROOT,
    normalizedPath: `${ROUTES.POST.ROOT}/:postId`,
  },
  {
    rootPath: ROUTES.PROFILE.ROOT,
    normalizedPath: `${ROUTES.PROFILE.ROOT}/:userId`,
  },
  {
    rootPath: ROUTES.CHAT.ROOT,
    normalizedPath: `${ROUTES.CHAT.ROOT}/:roomId`,
  },
] as const;

const UTM_QUERY_PARAMETER_MAP = {
  utm_id: 'campaign_id',
  utm_source: 'campaign_source',
  utm_medium: 'campaign_medium',
  utm_campaign: 'campaign_name',
  utm_term: 'campaign_term',
  utm_content: 'campaign_content',
} as const;

type UtmQueryParameter = keyof typeof UTM_QUERY_PARAMETER_MAP;
type GoogleAnalyticsCampaignField =
  (typeof UTM_QUERY_PARAMETER_MAP)[UtmQueryParameter];

type GoogleAnalyticsCampaignConfig = Partial<
  Record<GoogleAnalyticsCampaignField, string>
>;

const NUMERIC_ID_PATTERN = /^\d+$/;

const removeTrailingSlash = (pathname: string) => {
  if (pathname === ROUTES.HOME) {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
};

const matchesNumericDetailPath = (pathname: string, rootPath: string) => {
  const detailPathPrefix = `${rootPath}/`;

  if (!pathname.startsWith(detailPathPrefix)) {
    return false;
  }

  return NUMERIC_ID_PATTERN.test(pathname.slice(detailPathPrefix.length));
};

export const normalizeAnalyticsPath = (pathname: string) => {
  const normalizedPathname = removeTrailingSlash(pathname);

  if (EXCLUDED_ANALYTICS_PATHS.has(normalizedPathname)) {
    return null;
  }

  const matchedPath = DYNAMIC_ANALYTICS_PATHS.find(({ rootPath }) =>
    matchesNumericDetailPath(normalizedPathname, rootPath),
  );

  return matchedPath?.normalizedPath ?? normalizedPathname;
};

export const getGoogleAnalyticsCampaignConfig = (search: string) => {
  const searchParams = new URLSearchParams(search);
  const campaignConfig: GoogleAnalyticsCampaignConfig = {};

  for (const queryParameter of Object.keys(
    UTM_QUERY_PARAMETER_MAP,
  ) as UtmQueryParameter[]) {
    const value = searchParams.get(queryParameter)?.trim();

    if (!value) {
      continue;
    }

    const campaignField = UTM_QUERY_PARAMETER_MAP[queryParameter];
    campaignConfig[campaignField] = value;
  }

  return campaignConfig;
};
