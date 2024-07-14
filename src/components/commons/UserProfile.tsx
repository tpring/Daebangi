import Image from "next/image";
import userDefaultImage from "../../../public/image/icons/userDefaultImage.png";

type UserProfileProps = {
  src: string | null;
  width?: number;
  height?: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ src, width = 120, height = 120 }) => {
  return (
    <div
      className="border border-[#ccc] rounded-full overflow-hidden bg-[#fdfbfb]"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={src || userDefaultImage}
        width={width}
        height={height}
        alt="유저프로필"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default UserProfile;
