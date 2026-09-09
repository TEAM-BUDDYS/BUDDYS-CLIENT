import { BookmarkIcon, LocationIcon } from '@/shared/components/icons';

import { MapFloatingButton } from './map-floating-button';

interface MapFloatingControlsProps {
  onBookmarkClick: () => void;
  onLocationClick: () => void;
}

export const MapFloatingControls = ({
  onBookmarkClick,
  onLocationClick,
}: MapFloatingControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <MapFloatingButton
        aria-label="북마크"
        color="white"
        icon={<BookmarkIcon />}
        onClick={onBookmarkClick}
      />
      <MapFloatingButton
        aria-label="현재 위치"
        color="mint"
        icon={<LocationIcon />}
        onClick={onLocationClick}
      />
    </div>
  );
};
