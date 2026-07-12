import type { OnboardLocationOption } from '../model/onboard';

export const findCountryByName = (
  countryOptions: OnboardLocationOption[],
  countryName: string,
) => {
  return countryOptions.find((country) => country.name === countryName);
};
