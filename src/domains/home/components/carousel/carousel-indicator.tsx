interface CarouselIndicatorProps {
  total: number;
  currentIndex: number;
  onChange: (index: number) => void;
}

export const CarouselIndicator = ({
  total,
  currentIndex,
  onChange,
}: CarouselIndicatorProps) => {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, dotNumber) => dotNumber + 1).map(
        (dotNumber) => (
          <button
            key={dotNumber}
            type="button"
            aria-label={`${dotNumber}번째 배너 보기`}
            onClick={() => onChange(dotNumber - 1)}
            className={
              dotNumber - 1 === currentIndex
                ? 'bg-mint-300 h-1.75 w-4 rounded-full'
                : 'bg-mint-200 size-1.75 rounded-full'
            }
          />
        ),
      )}
    </div>
  );
};
