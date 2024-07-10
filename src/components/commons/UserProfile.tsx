import Image from "next/image";

type UserProfileProps = {
  src: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ src }) => {
  // 유저 정보에 따른 프로필 가져오는 로직 구현 해야함.

  if (src) {
    return (
      <div className="font-basics border rounded-[100%] w-[80px] h-[80px] flex items-center overflow-hidden">
        <Image src={src!} width={80} height={80} alt="유저프로필" />
      </div>
    );
  }
};

export default UserProfile;
