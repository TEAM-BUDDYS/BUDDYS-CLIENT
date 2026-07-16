type GoogleTagArguments =
  | ['js', Date]
  | ['config', string, Record<string, unknown>]
  | ['event', string, Record<string, unknown>];

type GoogleTag = (...args: GoogleTagArguments) => void;

interface Window {
  dataLayer: unknown[];
  gtag?: GoogleTag;
}
