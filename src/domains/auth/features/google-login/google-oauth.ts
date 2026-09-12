const GOOGLE_AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_OAUTH_STATE_KEY = 'google-oauth-state';

const getRequiredEnvironmentVariable = (
  value: string | undefined,
  name: string,
) => {
  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
};

export const getGoogleRedirectUri = () =>
  getRequiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    'NEXT_PUBLIC_GOOGLE_REDIRECT_URI',
  );

export const createGoogleAuthorizeUrl = () => {
  const clientId = getRequiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
  );
  const redirectUri = getGoogleRedirectUri();
  const state = crypto.randomUUID();

  sessionStorage.setItem(GOOGLE_OAUTH_STATE_KEY, state);

  const authorizeUrl = new URL(GOOGLE_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('scope', 'openid email profile');
  authorizeUrl.searchParams.set('state', state);

  return authorizeUrl.toString();
};

export const validateGoogleOAuthState = (state: string | null) => {
  const savedState = sessionStorage.getItem(GOOGLE_OAUTH_STATE_KEY);
  sessionStorage.removeItem(GOOGLE_OAUTH_STATE_KEY);

  return Boolean(state && savedState && state === savedState);
};
