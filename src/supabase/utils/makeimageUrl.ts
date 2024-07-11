import { createClient } from "../client";

const supabase = createClient();

export const uploadImage = async (file: File, path: string) => {
  // 이미지 업로드
  const { error: uploadError } = await supabase.storage.from("image").upload(path, file);

  if (uploadError) {
    console.error("이미지 업로드 실패: " + uploadError.message);
  }

  // 업로드된 이미지의 public URL을 가져오는 함수
  const { data: urlData } = await supabase.storage.from("image").getPublicUrl(path);

  return urlData.publicUrl;
};
