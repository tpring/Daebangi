"use client";

import { useUserStore } from "@/store/userStore";
import { createClient } from "@/supabase/client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import UserProfile from "../commons/UserProfile";

type CommentItem = {
  content: string;
  userId: string; // 댓글을 작성한 유저의 ID
  commentId: number;
  onCommentUpdate: () => void;
};
const CommentItem: React.FC<CommentItem> = ({ content, userId, commentId, onCommentUpdate }) => {
  const [commentUser, setCommentUser] = useState<User>();
  const [updating, setUpdating] = useState<boolean>(false);
  const [updatedCotent, setupdatedCotent] = useState<string>("");
  const [comment, setComment] = useState<string>(content);

  const supabase = createClient();

  const { userId: loginedUserId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  const isCorrectUser = (): boolean => {
    if (userId !== loginedUserId) {
      alert("로그인 후 사용해 주세요~!");
      console.log("현재 : ", loginedUserId);
      console.log("댓글 유저 : ", userId);
      return false;
    }
    return true;
  };

  useEffect(() => {
    // 아이디 값에 따른, 유저 정보를 받아오는 함수
    const fetchUserById = async () => {
      const { data, error } = await supabase.from("user").select("*").eq("user_id", userId);

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
    // 댓글을 작성한 사용자가 아니라면 함수 실행 불가.
    if (!isCorrectUser()) return;
    if (updating) {
      // 현재 업데이트 진행 상태라면,
      if (updatedCotent) {
        const { error } = await supabase.from("comment").update({ content: updatedCotent }).eq("comment_id", commentId);
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
    if (!isCorrectUser()) return;
    const response = await supabase.from("comment").delete().eq("comment_id", commentId);

    onCommentUpdate(); // 댓글 목록 업데이트
  };

  return (
    <li className="border-t border-b bg-white p-3 grid grid-cols-3 gap-2 items-center">
      <div className="col-span-2 flex items-center">
        {/* 프로필 이미지 부분 */}
        <div>
          <UserProfile src={commentUser?.profile as string} />
        </div>
        <div className="ml-[50px] ">
          <p className="font-semibold text-basics">{commentUser?.nickname as string}</p>
          {/* content 부분 */}
          {!updating ? (
            <p className="">{comment}</p>
          ) : (
            <form onSubmit={handleUpdateCommet}>
              <input
                className="border rounded-lg w-full px-2 cursor-not-allowed"
                value={updatedCotent}
                onChange={(e) => setupdatedCotent(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="flex gap-1 w-full items-center justify-end mr-3">
        {/*button 부분 */}
        {userId === loginedUserId ? (
          <>
            <button className="comment-button cursor-pointer" onClick={handleUpdateCommet}>
              수정
            </button>
            <div className="border-2 h-14" />
            <button className="comment-button cursor-pointer" onClick={handleDeleteComment}>
              삭제
            </button>
          </>
        ) : null}
      </div>
    </li>
  );
};

export default CommentItem;
