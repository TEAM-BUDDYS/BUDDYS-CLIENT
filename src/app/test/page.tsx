'use client';

import { useState } from 'react';

import { Filter } from '@/shared/components/ui/filter/filter';

const FILTERS = [
  '국가',
  '날짜',
  '나이',
  '성별',
  '기타 옵션',
  '언어',
  '직업',
  '지역',
  '취미',
  '종교',
  '키',
  '체형',
];

export default function TestPage() {
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    setPressedKeys((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="min-h-screen bg-[#F3F4F8]">
      <div className="flex items-center gap-[0.8rem] overflow-x-auto bg-[#F3F4F8] p-5">
        {FILTERS.map((label) => (
          <Filter
            key={label}
            label={label}
            pressed={Boolean(pressedKeys[label])}
            onPress={() => toggle(label)}
          />
        ))}
      </div>
    </div>
  );
}
