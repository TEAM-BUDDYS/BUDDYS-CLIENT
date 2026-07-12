'use client';

import { useId } from 'react';

import { ChipButton } from '@/shared/components/ui';

interface ChipOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface ChipOptionGroupProps<TValue extends string> {
  label?: string;
  options: ChipOption<TValue>[];
  selectedValues: TValue[];
  multiple?: boolean;
  onChange: (values: TValue[]) => void;
}

export const ChipOptionGroup = <TValue extends string>({
  label,
  options,
  selectedValues,
  multiple = false,
  onChange,
}: ChipOptionGroupProps<TValue>) => {
  const groupLabelId = useId();

  const handleOptionClick = (value: TValue) => {
    const isSelected = selectedValues.includes(value);

    if (multiple) {
      const nextValues = isSelected
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value];

      onChange(nextValues);
      return;
    }

    onChange(isSelected ? [] : [value]);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p id={groupLabelId} className="text-body-r-14 text-gray-500">
          {label}
        </p>
      )}
      <div
        role="group"
        aria-labelledby={label ? groupLabelId : undefined}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <ChipButton
              key={option.value}
              active={isSelected}
              aria-label={`${option.label} ${
                isSelected ? '선택 해제' : '선택'
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </ChipButton>
          );
        })}
      </div>
    </div>
  );
};
