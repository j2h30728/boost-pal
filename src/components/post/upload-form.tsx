"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@heroicons/react/24/solid";

import Button from "@/components/common/button";
import Textarea from "@/components/common/textarea";
import InputChip from "@/components/common/input-chip";
import { postSchema, UploadPostType } from "@/lib/schema";
import { CATEGORIES } from "@/constants/categories";
import useUploadImage from "@/hooks/useUploadImage";
import { uploadPost } from "@/app/upload/actions";
import { IMAGES_OPTIONS } from "@/constants/images";

export default function UploadForm() {
  const { dispatch, state } = useUploadImage();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UploadPostType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = handleSubmit(async (data: UploadPostType) => {
    if (!state.imageFile) return alert("파일이 없다!");
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", state.imageFile);
    const response = await fetch(state.uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) return;

    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    const { message } = await uploadPost(formData);
    setError("root", { message });
  });

  const onValid = async () => {
    await onSubmit();
  };
  return (
    <form action={onValid} className="py-3 *:w-full ">
      <div className="flex flex-col gap-5 ">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${state.previewImage})` }}
          className=" border-2 border-primary w-full aspect-[5/3] mx-auto flex items-center justify-center flex-col text-primary rounded-[16px] border-dashed cursor-pointer bg-center bg-contain bg-no-repeat">
          {!state.previewImage ? (
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-sub-border rounded-full">
                <PlusIcon className="w-6 h-6 text-base" />
              </div>
              <div className="text-neutral-400 text-sm">{errors.photo?.message ?? "사진을 추가해주세요."}</div>
            </div>
          ) : null}
        </label>
        <input
          onChange={(e) => dispatch.handleImageChange(e, setValue, IMAGES_OPTIONS.PUBLIC)}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-col gap-2">
          <p className="text-md font-bold">주제</p>
          <p className="text-neutral text-sm">작성하신 인증 주제를 1가지 선택해주세요.</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(CATEGORIES)
              .slice(1)
              .map(([value, title]) => (
                <InputChip key={value} value={value} type="radio" title={title} {...register("category")} />
              ))}
          </div>
          <p className="text-error">{errors.category?.message}</p>
        </div>
        <Textarea
          label="인증 내용"
          placeholder="인증에 대한 내용을 입력해주세요."
          errorMessage={errors.description?.message}
          {...register("description")}
        />
      </div>
      <Button text="작성 완료" />
      <p className="text-error">{errors.root?.message}</p>
    </form>
  );
}
