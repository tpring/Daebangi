import Image from "next/image";

type UserProfileProps = {
  src: string;
  width?: number;
  height?: number;
};

const UserProfile: React.FC<UserProfileProps> = ({
  src,
  width = 80,
  height = 80,
}) => {
  if (src) {
    const widthAndHeight = `w-[${width}px] h-[${height}px]`;
    return (
      <div
        className={`font-basics border rounded-[100%] ${widthAndHeight} flex items-center overflow-hidden`}
      >
        <Image src={src!} width={width} height={height} alt="유저프로필" />
      </div>
    );
  }
};

export default UserProfile;
