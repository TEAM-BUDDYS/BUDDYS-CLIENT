import { Button, EmptyState } from '@/shared/components/ui';

export interface ContentEmptyStateProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export const ContentEmptyState = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: ContentEmptyStateProps) => (
  <div className="flex flex-col items-center gap-4">
    <EmptyState title={title} description={description} />
    <Button
      variant="primary"
      className="text-body-sb-14 h-auto w-fit flex-none gap-2.5 px-3 py-2"
      onClick={onButtonClick}
    >
      {buttonLabel}
    </Button>
  </div>
);
