import { ChangeEventHandler } from "react";

type CommentInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

const CommentInput: React.FC<CommentInputProps> = ({ onChange }) => {
  return (
    <div>
      <div className="w-[80px] h-[80px] border">사진 들어갈 자리</div>
      <input
        type="sumbit"
        onChange={onChange}
        className="w-full rounded-[60px] border border-point outline-point"
      />
    </div>
  );
};

export default CommentInput;
