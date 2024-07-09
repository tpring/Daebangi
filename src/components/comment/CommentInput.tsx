import { FormEventHandler } from 'react';

type CommentInputProps = {
    handleSumbit: FormEventHandler | undefined;
};

const CommentInput: React.FC<CommentInputProps> = ({ handleSumbit }) => {
    return (
        <form className="flex" onSubmit={handleSumbit}>
            <div className="w-[80px] h-[80px] border border-black">사진 들어갈 자리</div>
            <input type="sumbit" className="w-full rouneded-[60px] border border-[#7E4431]" />
        </form>
    );
};

export default CommentInput;
