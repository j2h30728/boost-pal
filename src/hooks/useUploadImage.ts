import { getUploadUrl } from "@/app/upload/actions";
import { useState } from "react";

export default function useUploadImage() {
  const [previewImage, setPreviewImage] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setValueOfForm: (name: "photo", value: string) => void
  ) => {
    const { files } = event.target;

    if (!files) return alert("파일이 없다!");
    const file = files[0];

    if (!file.type.includes("image")) return alert("이미지 파일만 업로드 가능합니다.");
    if (file.size > 4 * 1024 * 1024) return alert("크기가 4MB를 초과하는 이미지는 업로드 할 수 없습니다.");
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setImageFile(file);

    const { success, result } = await getUploadUrl();

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValueOfForm("photo", `https://imagedelivery.net/wLHa2XjZzk_8Ca42_eTQww/${id}`);
    }
  };

  return { handleImageChange, state: { previewImage, uploadUrl, imageFile } };
}
