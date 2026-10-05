import { TooltipArrowIcon } from '@/shared/components/icons';

export const CourseCompanionInviteTooltip = () => {
  return (
    <div className="relative h-12.25 w-fit">
      <div className="bg-mint-300 rounded-xl px-4 py-2.5">
        <p className="text-body-r-14 whitespace-nowrap text-white">
          버디즈에 가입하지 않은 동행도 초대해보세요
        </p>
      </div>
      <TooltipArrowIcon className="absolute top-[35.5px] left-[23.4px] h-[11.7311px] w-[15.1819px] rotate-180" />
    </div>
  );
};
