import { createClient } from "@/supabase/client";

const supabase = createClient();

export const checkLikeStatus = async (userId: string, bakeryId: string) => {
  try {
    const { data, error } = await supabase.from("like").select("*").eq("user_id", userId).eq("bakery_id", bakeryId);

    if (error) {
      console.error(error);
      return false;
    } else {
      return data.length > 0;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const toggleLikeStatus = async (isLiked: boolean, userId: string, bakeryId: string) => {
  try {
    if (isLiked) {
      const { error } = await supabase.from("like").delete().eq("user_id", userId).eq("bakery_id", bakeryId);

      if (error) {
        console.error(error);
        return false;
      } else {
        return true;
      }
    } else {
      const { error } = await supabase.from("like").insert({
        user_id: userId,
        bakery_id: bakeryId,
      });

      if (error) {
        console.error(error);
        return false;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

// `userId`를 사용하여 좋아요한 bakery의 ID 리스트를 가져오기
export const getUserLikedBakeryIds = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("like").select("bakery_id").eq("user_id", userId);

    if (error) {
      console.error("Failed to fetch liked bakeries:", error);
      throw error;
    }

    return data?.map((row: any) => row.bakery_id) || [];
  } catch (error) {
    console.error("Error in getUserLikedBakeryIds:", error);
    throw error;
  }
};
