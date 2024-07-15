import { createClient } from "@/supabase/client";
import { Bakery } from "@/types/bakery";

export const fetchBakeryDetails = async (bakeryId: string): Promise<Bakery | null> => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("bakery").select("*").eq("bakery_id", bakeryId).single();
    if (error) {
      console.error("Error fetching bakery details:", error);
      return null;
    }
    return data as any as Bakery;
  } catch (error) {
    console.error("Error fetching bakery details:", error);
    return null;
  }
};
