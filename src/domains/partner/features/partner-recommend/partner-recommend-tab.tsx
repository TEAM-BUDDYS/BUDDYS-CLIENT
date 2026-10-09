import { PreferenceBuddySection } from './preference-buddy-section';
import { SameCountryBuddySection } from './same-country-buddy-section';

export const PartnerRecommendTab = () => {
  return (
    <>
      <SameCountryBuddySection />
      <PreferenceBuddySection />
    </>
  );
};
