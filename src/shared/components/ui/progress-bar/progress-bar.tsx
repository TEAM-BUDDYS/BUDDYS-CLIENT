interface ProgressBarProps {
  currentStep: number;
  totalStep: number;
}

export const ProgressBar = ({ currentStep, totalStep }: ProgressBarProps) => {
  const percent =
    totalStep > 0
      ? Math.min(100, Math.max(0, (currentStep / totalStep) * 100))
      : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${percent}% 완료`}
      className="bg-mint-50 h-1.5 w-full overflow-hidden rounded-sm"
    >
      <div
        className="bg-mint-300 h-full rounded-sm transition-[width] duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
