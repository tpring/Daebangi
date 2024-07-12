import Image from "next/image";
import userDefualteImage from "../../../public/image/icons/userDefaultImage.png";
type UserProfileProps = {
  src: string | null;
  width?: number;
  height?: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ src, width = 80, height = 80 }) => {
  const width_height = `w-[${width}px] h-[${height}px]`;
  return (
    <div className={`border rounded-full ${width_height} overflow-hidden`}>
      <Image
        src={src || userDefualteImage.src}
        width={width}
        height={height}
        alt="유저프로필"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserProfile;
