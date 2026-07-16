import { preparingImage } from '@/shared/assets/illustrations';

import { CommonImage } from '../../common-image/common-image';
import { Modal } from '../modal';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
}

export const ComingSoonModal = ({ open, onClose }: ComingSoonModalProps) => {
  return (
    <Modal
      type="alert"
      title="준비 중인 기능이에요"
      description={
        <>
          편리하게 이용하실 수 있도록
          <br />
          열심히 준비하고 있어요
        </>
      }
      visual={
        <CommonImage
          src={preparingImage}
          alt=""
          width={140}
          height={140}
          radius="rounded-none"
          className="object-contain"
        />
      }
      open={open}
      onClose={onClose}
    />
  );
};
