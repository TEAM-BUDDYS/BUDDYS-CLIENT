interface PostCreateQuestionHeaderProps {
  title: string;
  description: string;
}

export const PostCreateQuestionHeader = ({
  title,
  description,
}: PostCreateQuestionHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-title-b-22 text-gray-800">{title}</h1>
      <p className="text-body-m-15 text-gray-500">{description}</p>
    </div>
  );
};
