import UserProfile from "../commons/UserProfile";

type CommentItem = {
  nickname: string;
  content: string;
};
const CommentItem: React.FC<CommentItem> = ({ nickname, content }) => {
  return (
    <li className="border bg-white p-3 flex justify-between items-center">
      <div className="flex items-center">
        <UserProfile />
        <div className="ml-[50px]">
          <p className="font-semibold text-basics">{nickname}</p>
          <p>{content}</p>
        </div>
      </div>
      <div className="mr-3 flex gap-1">
        <button className="comment-button">수정</button>
        <div className="border-2 h-12" />
        <button className=" comment-button">삭제</button>
      </div>
    </li>
  );
};

export default CommentItem;
