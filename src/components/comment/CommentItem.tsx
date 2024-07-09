type CommentItem = {
  nickname: string;
  content: string;
};
const CommentItem: React.FC<CommentItem> = ({ nickname, content }) => {
  return (
    <li>
      {/*유저 이미지가 들어갈 공간 */}
      <div>
        <p>{nickname}</p>
        <p>{content}</p>
      </div>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
};

export default CommentItem;
