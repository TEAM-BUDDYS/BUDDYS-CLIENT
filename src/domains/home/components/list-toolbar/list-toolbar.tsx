import { SortDropdown } from '../sort-dropdown/sort-dropdown';

interface ListToolbarProps {
  count: number;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
}

export const ListToolbar = ({
  count,
  options,
  value,
  onChange,
}: ListToolbarProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-body-r-14 text-gray-800">
        총 <span className="text-mint-300">{count}</span>건
      </p>
      <SortDropdown options={options} value={value} onChange={onChange} />
    </div>
  );
};
