"use client";

import { fetchComments, insertComment } from "@/app/api/supabase/comment/route";
import { useUserStore } from "@/store/userStore";
import { Comment } from "@/types/comment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserProfile from "../commons/UserProfile";
import CommentItem from "./CommentItem";

type CommentProps = {
  bakery_id: string;
};
const CommentList: React.FC<CommentProps> = ({ bakery_id: bakeryId }) => {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const { userId: loginUserId, profile } = useUserStore((state) => ({
    userId: state.userId as string,
    profile: state.profile,
  }));

  useEffect(() => {
    fetchCommentList();
  }, []);

  // 댓글 목록 불러오기
  const fetchCommentList = async () => {
    try {
      const comments = await fetchComments(bakeryId, loginUserId);
      setCommentList(comments);
    } catch (error) {
      console.error("댓글 목록 fetch 중 에러 :", error);
    }
  };

  // 댓글 저장 함수
  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length < 1) {
      alert("최소 1글자 이상 입력해야 합니다.");
      return;
    }
    try {
      const updatedCommets = await insertComment(bakeryId, loginUserId, comment);
      setCommentList(updatedCommets);
      setComment("");
    } catch (error) {
      console.error("댓글 작성 중 에러 :", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!loginUserId) {
      alert("로그인 후 사용해 주세요~!");
      return;
    }
    setComment(e.target.value);
  };

  return (
    <div>
      {/* 댓글 입력란 */}
      <form className="flex items-center gap-2" onSubmit={handleSubmitComment}>
        {/*유저 프로필 */}
        <div className="ml-3">
          <UserProfile src={profile?.length === 0 ? profile : ""} width={40} height={40} />
        </div>
        {/* <Image src={profile as string} alt="유저 프로필" width={80} height={80} /> */}
        <input
          value={comment}
          onChange={handleChange}
          placeholder="댓글을 남겨 주세요."
          className="font-secondary px-5 w-full h-[52px] text-subtitle border-point border-4 rounded-[60px] focus:outline-none"
        />
      </form>
      <div>
        <h1 className="text-subtitle font-semibold py-2">
          댓글 <span>{commentList?.length}</span>개
        </h1>
        {/* 댓글 목록 */}
        {commentList.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <CommentItem
                content={comment.content}
                userId={comment.user_id}
                commentId={comment.comment_id as number}
                onCommentUpdate={fetchCommentList}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
