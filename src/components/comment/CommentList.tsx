"use client";

import { useUserStore } from "@/store/userStore";
import { createClient } from "@/supabase/client";
import { Comment } from "@/types/comment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserProfile from "../commons/UserProfile";
import CommentItem from "./CommentItem";

type CommentProps = {
  bakery_id: string;
};
const CommentList: React.FC<CommentProps> = ({ bakery_id }) => {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userId, profile } = useUserStore((state) => ({
    userId: state.userId,
    profile: state.profile,
  }));

  const supabase = createClient();
  useEffect(() => {
    fetcthCommentList();
  }, []);

  // 댓글 목록 불러오기
  const fetcthCommentList = async () => {
    try {
      const { data: comments, error } = await supabase
        .from("comment")
        .select("*")
        .eq("bakery_id", bakery_id)
        .order("comment_id", { ascending: false });
      if (comments) {
        const sortedComments = [
          ...comments.filter((comment) => comment.user_id === userId),
          ...comments.filter((comment) => comment.user_id !== userId),
        ];
        setCommentList(sortedComments);
      } else {
        console.error("댓글 목록 fetch 실패 :", error);
        throw error;
      }
    } catch (error) {
      console.error("댓글 목록 fetch 중 에러 : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 저장 함수
  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("댓글작성");
    const bakeryId = bakery_id;
    // DB에 입력하기
    const { error } = await supabase.from("comment").insert({
      user_id: userId as string,
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
    <div>
      {/* 댓글 입력란 */}
      <h1 className="text-subtitle py-2">댓글 남겨 주세요</h1>
      <form className="flex items-center gap-2" onSubmit={handleSubmitComment}>
        {/*유저 프로필 */}
        <div className="ml-3">
          <UserProfile src={profile as string} />
        </div>
        {/* <Image src={profile as string} alt="유저 프로필" width={80} height={80} /> */}
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
