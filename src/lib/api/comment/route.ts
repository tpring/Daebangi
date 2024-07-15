import { createClient } from "@/supabase/client";
import { Comment } from "@/types/comment";
const supabase = createClient();

export const fetchComments = async (bakery_id: string, userId: string | undefined): Promise<Comment[]> => {
  try {
    const { data: comments, error } = await supabase
      .from("commentt")
      .select("*")
      .eq("bakery_id", bakery_id)
      .order("id", { ascending: false });

    if (error) {
      console.error("댓글 목록 fetch 실패 :", error);
      throw error;
    }

    const sortedComments = [
      ...(comments?.filter((comment) => comment.user_id === userId) || []),
      ...(comments?.filter((comment) => comment.user_id !== userId) || []),
    ];

    return sortedComments;
  } catch (error) {
    console.error("댓글 목록 fetch 중 에러 :", error);
    throw error;
  }
};

// 댓글을 저장하고 저장된 목록을 반환 하는 함수.
export const insertComment = async (bakery_id: string, userId: string, content: string): Promise<Comment[]> => {
  try {
    const { error } = await supabase.from("commentt").insert({
      user_id: userId,
      bakery_id: bakery_id,
      content: content,
    });

    if (error) {
      console.error("댓글 입력 요청 중 에러 (DB) :", error);
      throw error;
    }

    const updatedComments = await fetchComments(bakery_id, userId);
    return updatedComments;
  } catch (error) {
    console.error("댓글 입력 요청 까지 했지만 에러 :", error);
    throw error;
  }
};

// 댓글 업데이트 및 업데이트 된 목록 반환 하는 함수.
export const updateComment = async (commentId: number, content: string): Promise<void> => {
  const { data, error } = await supabase.from("commentt").update({ content }).eq("id", commentId).select();

  if (error) {
    console.error("댓글 업데이트 실패 :", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from("commentt").delete().eq("id", commentId);

  if (error) {
    console.error("댓글 삭제 실패 :", error);
    throw error;
  }
};
