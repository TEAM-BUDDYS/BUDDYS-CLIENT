import { PreferenceBuddySection } from './preference-buddy-section';
import { SameCountryBuddySection } from './same-country-buddy-section';

export const PartnerRecommendTab = () => {
  return (
    <>
      <SameCountryBuddySection />
      <hr
        className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />
      <PreferenceBuddySection />
    </>
  );
};
