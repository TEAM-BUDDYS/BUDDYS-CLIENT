const TOTAL_STEPS = 4;

interface ProgressBarProps {
  step: 1 | 2 | 3 | 4;
}

export const ProgressBar = ({ step }: ProgressBarProps) => {
  const percent = (step / TOTAL_STEPS) * 100; // 25 | 50 | 75 | 100

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${percent}% 완료`}
      className="bg-mint-50 h-1.5 w-85.75 overflow-hidden rounded-sm"
    >
      <div
        className="bg-mint-300 h-full rounded-sm transition-[width] duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
