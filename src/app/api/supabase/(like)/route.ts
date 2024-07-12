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
