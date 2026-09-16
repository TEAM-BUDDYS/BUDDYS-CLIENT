import { BookmarkIcon, LocationIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

interface MapFloatingControlsProps {
  isBookmarkActive: boolean;
  isLocationActive: boolean;
  onBookmarkClick: () => void;
  onLocationClick: () => void;
}

export const MapFloatingControls = ({
  isBookmarkActive,
  isLocationActive,
  onBookmarkClick,
  onLocationClick,
}: MapFloatingControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <IconButton
        aria-label={isBookmarkActive ? '북마크 표시 해제' : '북마크 표시'}
        aria-pressed={isBookmarkActive}
        className={
          isBookmarkActive
            ? 'text-mint-300 size-9 bg-gray-100'
            : 'text-mint-300 size-9 bg-white'
        }
        icon={<BookmarkIcon />}
        iconClassName="size-5"
        onClick={onBookmarkClick}
      />
      <IconButton
        aria-label={isLocationActive ? '현재 위치 추적 해제' : '현재 위치'}
        aria-pressed={isLocationActive}
        className={
          isLocationActive
            ? 'bg-mint-400 size-9 text-white'
            : 'bg-mint-300 size-9 text-white'
        }
        icon={<LocationIcon />}
        iconClassName="size-5"
        onClick={onLocationClick}
      />
    </div>
  );
};
