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

  return (
    <div className="border">
      <h1 className="text-subtitl font-semibold">댓글 남겨 주세요</h1>
      <form onSubmit={handleSubmit}>
        <Image src={userProfile} alt="유저 프로필" width={30} height={30} />
        <input
          onChange={handleChange}
          className="w-full border border-point rounded-[60px]"
        />
      </form>
      <div>
        <h1>댓글 3개</h1>
        <ul>
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
          <CommentItem nickname={"빵이조아"} content={"택수님의 고향.."} />
        </ul>
      </div>
    </div>
  );
};

export default Comment;
