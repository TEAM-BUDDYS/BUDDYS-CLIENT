import { SimbolIcon } from '@/shared/components/icons';
import { BottomSheet, Button } from '@/shared/components/ui';

interface PwaModalProps {
  open: boolean;
  onClose: () => void;
  onShowPwaGuide: () => void;
}

export const PwaModal = ({ open, onClose, onShowPwaGuide }: PwaModalProps) => {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="pwa 설치 안내 모달">
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-8.5">
        <SimbolIcon className="size-20" />
        <p className="text-title-b-18 pb-3 text-center text-gray-800">
          홈 화면에 buddys 앱을 추가하고
          <br /> 알림을 바로 받아보세요
        </p>
        <Button onClick={onShowPwaGuide}>설치 없이 앱으로 열기</Button>
        <button
          type="button"
          onClick={onClose}
          className="text-body-r-14 text-gray-500"
        >
          나중에 받을게요
        </button>
      </div>
    </BottomSheet>
  );
};
