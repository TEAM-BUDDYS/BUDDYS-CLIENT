'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  rightSlot?: ReactNode;
  rightSlotLabel?: string;
  href?: string;
  onClick?: () => void;
}

export const SectionHeader = ({
  label,
  title,
  rightSlot,
  rightSlotLabel,
  href,
  onClick,
}: SectionHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-body-m-15 text-gray-500">{label}</span>
        <h2 className="text-title-b-18 text-gray-800">{title}</h2>
      </div>
      {rightSlot &&
        (href ? (
          <Link
            href={href}
            className="-mr-4 flex size-11 shrink-0 items-center justify-center"
            aria-label={rightSlotLabel ?? title}
          >
            {rightSlot}
          </Link>
        ) : onClick ? (
          <button
            type="button"
            className="-mr-4 flex size-11 shrink-0 items-center justify-center"
            aria-label={rightSlotLabel ?? title}
            onClick={onClick}
          >
            {rightSlot}
          </button>
        ) : (
          <div className="shrink-0">{rightSlot}</div>
        ))}
    </header>
  );
};
