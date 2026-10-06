import { LocationListItem } from '@/domains/profile/components/location-list-item/location-list-item';

// TODO: 저장한 장소 목록 API 연동 및 장소 상세 경로 확정 시 교체
const MOCK_SAVED_PLACES = [
  {
    placeId: 1,
    title: '오르세 미술관',
    description: 'Esplanade Valéry Giscard dEstaing, 75007 Paris, 프랑스',
    href: '#',
  },
  {
    placeId: 2,
    title: '오르세 미술관',
    description: 'Esplanade Valéry Giscard dEstaing, 75007 Paris, 프랑스',
    href: '#',
  },
];

export const SavedPlaceList = () => {
  return (
    <ul className="-mx-4">
      {MOCK_SAVED_PLACES.map(({ placeId, ...place }) => (
        <li key={placeId}>
          <LocationListItem {...place} />
        </li>
      ))}
    </ul>
  );
};
