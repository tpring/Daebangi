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
