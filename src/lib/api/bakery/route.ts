import { createClient } from "@/supabase/client";

const supabase = createClient();

export const searchBakery = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from("bakery")
      .select("*")
      .ilike("name", `%${keyword}%`)
      .order("sort_id", { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// `bakeryIds`를 사용하여 bakery 데이터를 가져오기
export const getBakeriesByIds = async (bakeryIds: string[]) => {
  try {
    const { data, error } = await supabase
      .from("bakery")
      .select("bakery_id, name, image, phone, address, comment_count")
      .in("bakery_id", bakeryIds)
      .order("sort_id", { ascending: true });

    if (error) {
      console.error("Failed to fetch bakery data:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getBakeriesByIds:", error);
    throw error;
  }
};

//bakery 테이블 sort_id 숫자 순서로 정보 가져오기
export const bakeryItem = async () => {
  try {
    const { data, error } = await supabase.from("bakery").select("*").order("sort_id", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("목록을 불러오는 중 오류가 발생했습니다.", error);
  }
};
