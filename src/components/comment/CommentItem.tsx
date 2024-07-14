"use client";

import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import UserProfile from "../commons/profile/UserProfile";
import { getUserById } from "@/lib/api/auth/route";
import { deleteComment, updateComment } from "@/lib/api/comment/route";
import { showConfirmToast } from "../commons/Toast/ConfirmToast";

type CommentItem = {
  content: string;
  userId: string; // 댓글을 작성한 유저의 ID
  commentId: number;
  onCommentUpdate: () => void;
};

const CommentItem: React.FC<CommentItem> = ({ content, userId, commentId, onCommentUpdate }) => {
  const [commentUser, setCommentUser] = useState<User | null>(null); // 댓글 작성자
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
      }
    };
    fetchUserById();
  }, [userId]);

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
    <li className="border-b bg-white p-3 grid grid-cols-3 gap-2 items-center sm-max:grid-cols-1">
      <div className="col-span-2 flex items-center sm-max:col-span-1">
        {/* 프로필 이미지 부분 */}
        <UserProfile src={commentUser?.profile as string} width={52} height={52} />
        <div className="ml-[50px] sm-max:ml-[20px] ">
          <p className="font-semibold text-basics">{commentUser?.nickname as string}</p>
          {/* content 부분 */}
          {!updating ? (
            <p>{comment}</p>
          ) : (
            <form>
              <input
                className="border rounded-lg w-full px-1 p-2 mt-1 cursor-not-allowed"
                value={updatedContent}
                onChange={(e) => setupdatedContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              {updatedContent.trim() === "" && <p className="text-red-500 text-sm mt-2">댓글을 입력해주세요.</p>}
            </form>
          )}
        </div>
      </div>
      <div className="flex gap-1 w-full items-center justify-end mr-3 relative sm-max:mt-2 sm-max:justify-start sm-max:flex-row sm-max:ml-[67px]">
        {/* button 부분 */}
        {userId === loginUserId ? (
          <div className="flex gap-1 sm-max:gap-2 sm-max:flex-row sm-max:items-center">
            <button className="comment-button cursor-pointer relative z-10" onClick={handleUpdateCommet}>
              {updating ? "완료" : "수정"}
            </button>
            <span className="inline-block h-4 w-px bg-gray-300 mx-2 sm-max:mx-2 sm-max:h-4 mt-2"></span>
            <button className="comment-button cursor-pointer relative z-10" onClick={handleDeleteComment}>
              삭제
            </button>
            <ToastContainer />
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default CommentItem;
