interface VerificationHeaderProps {
  title: string;
  description: string;
}

export const VerificationHeader = ({
  title,
  description,
}: VerificationHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-title-b-22 whitespace-pre-line text-gray-800">
        {title}
      </h1>
      <p className="text-body-m-15 whitespace-pre-line text-gray-500">
        {description}
      </p>
    </div>
  );
};
