import { BookmarkIcon, LocationIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

interface MapFloatingControlsProps {
  isBookmarkMode: boolean;
  isLocationActive: boolean;
  onBookmarkClick: () => void;
  onLocationClick: () => void;
}

export const MapFloatingControls = ({
  isBookmarkMode,
  isLocationActive,
  onBookmarkClick,
  onLocationClick,
}: MapFloatingControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <IconButton
        aria-label={
          isBookmarkMode ? '근처 장소 함께 보기' : '저장한 장소만 보기'
        }
        aria-pressed={isBookmarkMode}
        className={
          isBookmarkMode
            ? 'text-mint-300 size-9 bg-gray-100 shadow-[0_2px_6px_0_rgba(0,0,0,0.22)] enabled:active:bg-gray-100'
            : 'text-mint-300 size-9 bg-white shadow-[0_2px_6px_0_rgba(0,0,0,0.22)] enabled:active:bg-white'
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
            ? 'bg-mint-400 size-9 text-white shadow-[0_2px_6px_0_rgba(0,0,0,0.22)]'
            : 'bg-mint-300 size-9 text-white shadow-[0_2px_6px_0_rgba(0,0,0,0.22)]'
        }
        icon={<LocationIcon />}
        iconClassName="size-5"
        onClick={onLocationClick}
      />
    </div>
  );
};
