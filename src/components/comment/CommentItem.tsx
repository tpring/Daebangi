"use client";

import { createClient } from "@/supabase/client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import UserProfile from "../commons/UserProfile";

type CommentItem = {
  content: string;
  userId: string;
  commentId: number;
  onCommentUpdate: () => void;
};
const CommentItem: React.FC<CommentItem> = ({
  content,
  userId,
  commentId,
  onCommentUpdate,
}) => {
  const [commentUser, setCommentUser] = useState<User>();
  const [updating, setUpdating] = useState<boolean>(false);
  const [updatedCotent, setupdatedCotent] = useState<string>("");
  const [comment, setComment] = useState<string>(content);

  const supabase = createClient();
  useEffect(() => {
    // 아이디 값에 따른, 유저 정보를 받아오는 함수
    const fetchUserById = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", userId);

      if (data) {
        setCommentUser(data[0]);
      } else {
        console.error("댓글의 유저정보 fetch 실패 : ", error);
      }
    };
    fetchUserById();
  }, []);
  // 댓글 업데이트 로직
  const handleUpdateCommet = async () => {
    // 댓글 쓴 유저 아이디와 , 로그인된 유저 아이디 비교 로직 필요
    if (updating) {
      // 현재 업데이트 진행 상태라면,
      if (updatedCotent) {
        const { error } = await supabase
          .from("comment")
          .update({ content: updatedCotent })
          .eq("user_id", userId)
          .eq("comment_id", commentId);
      }
      // onCommentUpdate(); // 댓글 목록 업데이트
      setComment(updatedCotent);
      setUpdating(false); // 업데이트 모드 종료
    } else {
      // 업데이트 상태가 아니라면,
      setUpdating(true); // 업데이트 모드 시작
    }
  };

  // 댓글 삭제 로직
  const handleDeleteComment = async () => {
    // 댓글 쓴 유저 아이디와 , 로그인된 유저 아이디 비교 로직 필요
    const response = await supabase
      .from("comment")
      .delete()
      .eq("user_id", "386e5d5f-5bfc-427c-b4c0-126d3252b48c")
      .eq("comment_id", commentId);

    onCommentUpdate(); // 댓글 목록 업데이트
  };

  return (
    <li className="border-t border-b bg-white p-3 grid grid-cols-3 gap-2 items-center">
      <div className="col-span-2 flex items-center">
        {/* 프로필 이미지 부분 */}
        <UserProfile src={commentUser?.profile as string} />
        <div className="ml-[50px] ">
          <p className="font-semibold text-basics">
            {commentUser?.nickname as string}
          </p>
          {/* content 부분 */}
          {!updating ? (
            <p className="">{comment}</p>
          ) : (
            <form onSubmit={handleUpdateCommet}>
              <input
                className="border rounded-lg w-full px-2"
                value={updatedCotent}
                onChange={(e) => setupdatedCotent(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="flex gap-1 w-full items-center justify-end mr-3">
        {/*button 부분 */}
        <button className="comment-button" onClick={handleUpdateCommet}>
          수정
        </button>
        <div className="border-2 h-14" />
        <button className="comment-button" onClick={handleDeleteComment}>
          삭제
        </button>
      </div>
    </li>
  );
};

export default CommentItem;
