"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../common/button";
import Input from "../common/input";
import useUploadImage from "@/hooks/useUploadImage";
import { profileSchema, ProfileType } from "@/lib/schema";
import { InitialProfileType } from "@/service/userService";
import { editProfile } from "@/app/(tab)/users/[username]/edit/actions";

export default function ProfileEditForm({ initialUserInformation }: { initialUserInformation: InitialProfileType }) {
  const { handleImageChange, setPreviewImage, state } = useUploadImage();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: initialUserInformation.email ?? "",
      username: initialUserInformation.username,
      bio: initialUserInformation.bio ?? "",
      photo: initialUserInformation.avatar ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data: ProfileType) => {
    if (!state.imageFile) return alert("파일이 없다!");
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", state.imageFile);
    const response = await fetch(state.uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) return;

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("newPassword", data.newPassword ?? "");
    formData.append("bio", data.bio ?? "");
    formData.append("photo", data.photo ?? "");
    const errors = await editProfile(formData);
    setError("password", { message: errors?.fieldErrors.password?.at(0) });
  });

  const onValid = async () => {
    await onSubmit();
  };
  const onClickCancelAvatar = () => {
    setValue("photo", "");
    setPreviewImage("");
  };
  return (
    <form action={onValid} className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div
          style={{ backgroundImage: `url(${state.previewImage ? state.previewImage : getValues("photo")})` }}
          className={`size-20 rounded-full  bg-center bg-cover ${state.previewImage ? "" : "bg-underline"}`}></div>
        <div className="flex -mt-3">
          <label htmlFor="photo" className=" cursor-pointer primary-button w-20 text-xs rounded-3xl ">
            <span>이미지 수정</span>
          </label>
          <button
            className=" w-20 text-xs rounded-3xl  bg-secondary font-semibold text-neutral"
            type="button"
            onClick={onClickCancelAvatar}>
            이미지 제거
          </button>
        </div>
        <input
          onChange={(e) => handleImageChange(e, setValue)}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
      </div>
      <Input
        label="이름"
        type="text"
        required
        placeholder="이름을 입력해주세요."
        errorMessage={errors.username?.message}
        {...register("username")}
      />
      <Input
        label="이메일"
        type="email"
        required
        placeholder="이메일을 입력해주세요."
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="현재 비밀번호"
        type="password"
        required
        placeholder="현재 비밀번호를 입력해주세요."
        errorMessage={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="새 비밀번호"
        type="password"
        required={false}
        placeholder="변경할 새로운 비밀번호를 입력해주세요."
        errorMessage={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Input
        label="자기소개"
        type="text"
        required={false}
        placeholder="자기소개를 입력해주세요."
        errorMessage={errors.email?.message}
        {...register("bio")}
      />
      <Button text="수정 완료" />
    </form>
  );
}
