'use client';

import { useId, useState } from 'react';

import {
  BottomSheet,
  Button,
  TextArea,
  TextField,
} from '@/shared/components/ui';
import { useVirtualKeyboard } from '@/shared/hooks/use-virtual-keyboard';

import type { CourseCreateDayFormState } from '../model';
import { useMemoCostSheetViewport } from './use-memo-cost-sheet-viewport';

type MemoCostValue = Pick<CourseCreateDayFormState, 'memo' | 'cost'>;

interface CourseCreateMemoCostSheetProps extends MemoCostValue {
  dayNumber: CourseCreateDayFormState['dayNumber'];
  onClose: () => void;
  onConfirm: (value: MemoCostValue) => void;
}

const formatCostInput = (cost: CourseCreateDayFormState['cost']) => {
  return cost === null ? '' : new Intl.NumberFormat('ko-KR').format(cost);
};

export const CourseCreateMemoCostSheet = ({
  dayNumber,
  memo,
  cost,
  onClose,
  onConfirm,
}: CourseCreateMemoCostSheetProps) => {
  const titleId = useId();
  const [draftMemo, setDraftMemo] = useState(memo);
  const [draftCost, setDraftCost] = useState(cost);
  const isVirtualKeyboardOpen = useVirtualKeyboard();
  const viewportStyle = useMemoCostSheetViewport();

  const handleCostChange = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (!digits) {
      setDraftCost(null);
      return;
    }

    const nextCost = Number(digits);

    if (Number.isSafeInteger(nextCost)) {
      setDraftCost(nextCost);
    }
  };

  const handleConfirm = () => {
    onConfirm({ memo: draftMemo.trim(), cost: draftCost });
    onClose();
  };

  return (
    <BottomSheet
      open
      ariaLabelledBy={titleId}
      className="flex flex-col overflow-clip rounded-t-[20px] px-4 pb-8"
      handleClassName="h-1.5 w-14"
      repositionInputs={false}
      style={viewportStyle}
      onClose={onClose}
    >
      <h2
        className="sr-only"
        id={titleId}
      >{`Day ${dayNumber} 메모 및 비용`}</h2>
      <div className="flex min-h-0 flex-col gap-4">
        <div
          className="flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain *:shrink-0"
          data-vaul-no-drag
        >
          <TextArea
            className="h-38"
            label="메모 추가"
            placeholder="예시) 오르세 미술관을 구경하고 맛있는 식사를 했다!"
            rows={4}
            value={draftMemo}
            onChange={(event) => setDraftMemo(event.target.value)}
          />
          <TextField
            inputMode="numeric"
            label="KRW (원)"
            placeholder="예시) 300,000원"
            value={formatCostInput(draftCost)}
            onChange={(event) => handleCostChange(event.target.value)}
          />
        </div>
        {!isVirtualKeyboardOpen && (
          <Button className="shrink-0" onClick={handleConfirm}>
            작성 완료
          </Button>
        )}
      </div>
    </BottomSheet>
  );
};
