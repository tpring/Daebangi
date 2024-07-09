"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import userProfile from "../../../public/image/icons/userDefaultImage.png";
import CommentItem from "./CommentItem";
const Comment: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<string[]>([]);

  // DB에 저장하는 로직으로 변경 예정
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentList([...commentList, comment]);
    setComment(""); // Reset comment input after submission
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  //  삭제 수정 로직 구현 해야함.
  return (
    <div className="border">
      <h1 className="text-subtitle font-semibold py-2">댓글 남겨 주세요</h1>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <Image src={userProfile} alt="유저 프로필" width={80} height={80} />
        <input
          onChange={handleChange}
          className="px-5 w-full h-[52px] text-title border-point border-4 rounded-[60px] focus:outline-none"
        />
      </form>
      <div>
        {/* 댓글 갯수 구하는 로직 구현해야함 */}
        <h1 className="text-subtitle font-semibold py-2">
          댓글 <span>3</span>개
        </h1>
        <ul>
          {/* 더미 데이터 입니다. */}
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
        </ul>
      </div>
    </div>
  );
};

export default Comment;
