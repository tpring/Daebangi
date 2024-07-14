"use client";

import { getUserById } from "@/app/api/supabase/auth/route";
import { deleteComment, updateComment } from "@/app/api/supabase/comment/route";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import UserProfile from "../commons/UserProfile";
import { showConfirmToast } from "../commons/toast/ConfirmToast";

type CommentItem = {
  content: string;
  userId: string; // 댓글을 작성한 유저의 ID
  commentId: number;
  onCommentUpdate: () => void;
};
const CommentItem: React.FC<CommentItem> = ({ content, userId, commentId, onCommentUpdate }) => {
  const [commentUser, setCommentUser] = useState<User | null>(); // 댓글 작성자
  const [updating, setUpdating] = useState<boolean>(false); // 업데이트 중 인지 판별 하는 상태
  const [updatedContent, setupdatedContent] = useState<string>(""); // 수정되는 내용
  const [comment, setComment] = useState<string>(content); // 보여지는 댓글

  const { userId: loginUserId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  useEffect(() => {
    // 아이디 값에 따른, 댓글의 유저 정보를 받아오는 함수
    const fetchUserById = async () => {
      try {
        const data = await getUserById(userId);
        setCommentUser(data);
      } catch (error) {
        console.error("댓글 유저 정보 fetch 중 실패", error);
        throw error;
      }
    };
    fetchUserById();
  }, []);

  // 댓글 업데이트 로직
  const handleUpdateCommet = async () => {
    setupdatedContent(content);

    if (updating && updatedContent.trim()) {
      await updateComment(commentId, updatedContent);
      setComment(updatedContent);
      setUpdating(false); // 업데이트 모드 종료
    } else {
      setUpdating(true); // 업데이트 모드 시작
    }
    onCommentUpdate();
  };

  // 댓글 삭제 로직
  const handleDeleteComment = () => {
    const onConfirm = async () => {
      await deleteComment(commentId).then(() => {
        onCommentUpdate(); // 댓글 목록 업데이트
      });
    };

    showConfirmToast("정말로 이 댓글을 삭제하시겠습니까?", onConfirm);
  };

  return (
    <li className="border-t border-b bg-white p-3 grid grid-cols-3 gap-2 items-center">
      <div className="col-span-2 flex items-center">
        {/* 프로필 이미지 부분 */}
        <div className="w-[80px]">
          <UserProfile src={commentUser?.profile as string} />
        </div>
        <div className="ml-[50px] ">
          <p className="font-semibold text-basics">{commentUser?.nickname as string}</p>
          {/* content 부분 */}
          {!updating ? (
            <p className="">{comment}</p>
          ) : (
            <form>
              <input
                className="border rounded-lg w-full px-2 cursor-not-allowed"
                value={updatedContent}
                onChange={(e) => setupdatedContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              {updatedContent.trim() === "" && <p className="text-red-500 text-sm">댓글을 입력해주세요.</p>}
            </form>
          )}
        </div>
      </div>
      <div className="flex gap-1 w-full items-center justify-end mr-3">
        {/*button 부분 */}
        {userId === loginUserId ? (
          <>
            <button className="comment-button cursor-pointer" onClick={handleUpdateCommet}>
              수정
            </button>
            <div className="border-2 h-14" />
            <button className="comment-button cursor-pointer" onClick={handleDeleteComment}>
              삭제
            </button>
            <ToastContainer />
          </>
        ) : null}
      </div>
    </li>
  );
};

export default CommentItem;
