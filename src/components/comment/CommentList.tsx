"use client";

import { createClient } from "@/supabase/client";
import { Comment } from "@/types/comment";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import userProfile from "../../../public/image/icons/userDefaultImage.png";
import CommentItem from "./CommentItem";

type CommentProps = {
  bakery_id: string;
};
const CommentList: React.FC<CommentProps> = ({ bakery_id }) => {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>();

  const supabase = createClient();
  useEffect(() => {
    fetcthCommentList();
  }, []);

  // 댓글 목록 불러오기
  const fetcthCommentList = async () => {
    const { data: comments, error } = await supabase
      .from("comment")
      .select("*")
      .eq("bakery_id", bakery_id)
      .order("comment_id", { ascending: false });
    if (comments) {
      setCommentList(comments);
    } else {
      console.error("댓글 목록 fetch 실패 :", error);
      throw error;
    }
  };

  // 댓글 저장 함수
  const handleSubmitComment = async () => {
    const userId = "386e5d5f-5bfc-427c-b4c0-126d3252b48c";
    const bakeryId = bakery_id;
    // DB에 입력하기
    const { error } = await supabase.from("comment").insert({
      user_id: userId,
      bakery_id: bakeryId,
      content: comment,
    });
    // 리셋
    setComment("");
    fetcthCommentList();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="border">
      {/* 댓글 입력란 */}
      <h1 className="text-title py-2">댓글 남겨 주세요</h1>
      <form className="flex items-center gap-2" onSubmit={handleSubmitComment}>
        {/* userProfile 전역에 있는 값 사용 */}
        <Image src={userProfile} alt="유저 프로필" width={80} height={80} />
        <input
          value={comment}
          onChange={handleChange}
          className="px-5 w-full h-[52px] text-subtitle border-point border-4 rounded-[60px] focus:outline-none"
        />
      </form>
      {/* 댓글 목록 */}
      {commentList && (
        <div>
          <h1 className="text-subtitle font-semibold py-2">
            댓글 <span>{commentList?.length}</span>개
          </h1>
          {commentList.map((comment) => {
            return (
              <div key={comment.comment_id}>
                <CommentItem
                  content={comment.content}
                  userId={comment.user_id}
                  commentId={comment.comment_id}
                  onCommentUpdate={fetcthCommentList}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentList;
