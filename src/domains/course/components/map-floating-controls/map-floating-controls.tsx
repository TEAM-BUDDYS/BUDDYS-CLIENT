import { BookmarkIcon, LocationIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

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
      <IconButton
        aria-label="북마크"
        className="text-mint-300 size-9 bg-white"
        icon={<BookmarkIcon />}
        iconClassName="size-5"
        onClick={onBookmarkClick}
      />
      <IconButton
        aria-label="현재 위치"
        className="bg-mint-300 size-9 text-white"
        icon={<LocationIcon />}
        iconClassName="size-5"
        onClick={onLocationClick}
      />
    </div>
  );
};
