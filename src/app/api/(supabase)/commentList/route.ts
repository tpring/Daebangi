import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// DB 에서 댓글 목록 가져오기
export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const data = await request.json();
  const bakery_id = data.bakery_id as string;
  const { data: bakeries, error } = await supabase
    .from("bakery")
    .select("content")
    .eq("bakery_id", bakery_id);

  if (error) {
    throw error;
  }
  if (!data) return NextResponse.json("", { status: 401 });
  return NextResponse.json(data);
};
