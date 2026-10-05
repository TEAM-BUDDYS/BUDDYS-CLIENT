'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useId } from 'react';

import { cn } from '@/lib/cn';
import { HandleIcon } from '@/shared/components/icons';
import { Chip } from '@/shared/components/ui';

import type { SelectedTag } from '../../model/tag-edit';

const getSortableId = (tag: SelectedTag) => `${tag.tagType}-${tag.id}`;

interface SortableTagChipProps {
  tag: SelectedTag;
}

const SortableTagChip = ({ tag }: SortableTagChipProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: getSortableId(tag) });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      className={cn(
        'touch-manipulation rounded-[30px] select-none',
        isDragging && 'relative z-10 opacity-80',
      )}
      aria-label={`${tag.name} 태그 순서 변경`}
      {...attributes}
      {...listeners}
    >
      <Chip variant="lineMedium" active className="gap-1">
        <HandleIcon className="size-3.5" />
        {tag.name}
      </Chip>
    </div>
  );
};

interface SortableTagChipListProps {
  tags: SelectedTag[];
  onChange: (tags: SelectedTag[]) => void;
}

export const SortableTagChipList = ({
  tags,
  onChange,
}: SortableTagChipListProps) => {
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = tags.findIndex((tag) => getSortableId(tag) === active.id);
    const newIndex = tags.findIndex((tag) => getSortableId(tag) === over.id);

    onChange(arrayMove(tags, oldIndex, newIndex));
  };

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tags.map(getSortableId)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <SortableTagChip key={getSortableId(tag)} tag={tag} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
