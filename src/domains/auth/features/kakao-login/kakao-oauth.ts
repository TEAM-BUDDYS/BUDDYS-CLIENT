const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_OAUTH_STATE_KEY = 'kakao-oauth-state';

const getRequiredEnvironmentVariable = (
  value: string | undefined,
  name: string,
) => {
  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
};

export const getKakaoRedirectUri = () =>
  getRequiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    'NEXT_PUBLIC_KAKAO_REDIRECT_URI',
  );

export const createKakaoAuthorizeUrl = () => {
  const clientId = getRequiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    'NEXT_PUBLIC_KAKAO_REST_API_KEY',
  );
  const redirectUri = getKakaoRedirectUri();
  const state = crypto.randomUUID();

  sessionStorage.setItem(KAKAO_OAUTH_STATE_KEY, state);

  const authorizeUrl = new URL(KAKAO_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('state', state);

  return authorizeUrl.toString();
};

export const validateKakaoOAuthState = (state: string | null) => {
  const savedState = sessionStorage.getItem(KAKAO_OAUTH_STATE_KEY);
  sessionStorage.removeItem(KAKAO_OAUTH_STATE_KEY);

  return Boolean(state && savedState && state === savedState);
};
