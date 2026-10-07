import Link from 'next/link';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import type { CourseItem } from '../../model/content';

interface CourseImageGridProps {
  courses: CourseItem[];
  className?: string;
}

export const CourseImageGrid = ({
  courses,
  className,
}: CourseImageGridProps) => (
  <ul className={cn('grid grid-cols-3 gap-x-0.75 gap-y-1 px-1', className)}>
    {courses.map((course) => (
      <li key={course.id}>
        <Link
          href={ROUTES.COURSE.DETAIL(course.id)}
          aria-label="코스 상세 보기"
          className="block"
        >
          {course.image ? (
            <CommonImage
              src={course.image}
              alt="코스 썸네일"
              width={120}
              height={120}
              radius="rounded-sm"
              className="aspect-square h-auto w-full"
            />
          ) : (
            <div
              className="aspect-square w-full rounded-sm bg-gray-100"
              aria-hidden="true"
            />
          )}
        </Link>
      </li>
    ))}
  </ul>
);
