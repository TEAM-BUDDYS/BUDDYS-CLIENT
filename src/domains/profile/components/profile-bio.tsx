interface ProfileBioProps {
  bio: string;
}

export const ProfileBio = ({ bio }: ProfileBioProps) => {
  return (
    <div className="flex w-full items-center rounded-xl bg-gray-50 px-6 py-5.5">
      <p className="text-body-m-14 min-w-0 flex-1 whitespace-pre-line text-gray-800">
        {bio}
      </p>
    </div>
  );
};
