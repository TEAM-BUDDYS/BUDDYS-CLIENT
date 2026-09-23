import Image, { StaticImageData } from 'next/image';

interface IntroSlideProps {
  titleLines: readonly [string, string];
  image: StaticImageData;
  alt: string;
}

export const IntroSlide = ({ titleLines, image, alt }: IntroSlideProps) => {
  return (
    <div className="flex flex-col items-center gap-12.75 pb-9.75">
      <p
        className="text-title-b-22 bg-clip-text text-center text-transparent"
        style={{
          backgroundImage:
            'linear-gradient(180deg, var(--color-gray-800) 0%, #636972 100%)',
        }}
      >
        {titleLines[0]}
        <br />
        {titleLines[1]}
      </p>
      <Image
        src={image}
        alt={alt}
        width={248}
        height={320}
        className="relative z-20"
      />
    </div>
  );
};
