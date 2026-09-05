import Image from 'next/image';

interface PwaInfoProps {
  step: number;
  description: string;
  images: readonly {
    src: string;
    width: number;
    height: number;
  }[];
}

export const PwaInfo = ({ step, description, images }: PwaInfoProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="border-mint-200 text-caption-m-12 text-mint-300 bg-mint-100 flex h-4.5 w-4.5 items-center justify-center rounded-sm border">
          {step}
        </span>
        <p className="text-body-sb-15 text-gray-800">{description}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {images.map(({ src, width, height }) => (
          <Image
            key={src}
            src={src}
            alt={`${step}단계 안내 이미지`}
            width={width}
            height={height}
          />
        ))}
      </div>
    </div>
  );
};
