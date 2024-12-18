"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "@heroicons/react/24/solid";
import { User } from "@prisma/client";

import Button from "../common/button";
import Input from "../common/input";
import useUploadImage from "@/hooks/useUploadImage";
import { localUserProfileSchema, ProfileType, socialUserProfileSchema } from "@/lib/schema";
import { editProfile } from "@/app/(tab)/users/[username]/edit/actions";
import { createBlurValidation } from "@/lib/client/form-validate";
import { checkEmailAvailability, checkUsernameAvailability } from "@/lib/server/validate";
import { EMAIL_ERROR_MESSAGE, USERNAME_ERROR_MESSAGE } from "@/constants/messages";
import { IMAGES_OPTIONS } from "@/constants/images";

export default function ProfileEditForm({ initialUserInformation }: { initialUserInformation: User }) {
  const { dispatch, state } = useUploadImage(initialUserInformation.avatar ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(initialUserInformation.isSocialUser ? socialUserProfileSchema : localUserProfileSchema),
    defaultValues: {
      email: initialUserInformation.email ?? "",
      username: initialUserInformation.username,
      bio: initialUserInformation.bio ?? "",
      photo: initialUserInformation.avatar ?? "",
    },
  });

  const onBlurUsername = createBlurValidation(checkUsernameAvailability, setError, "username", USERNAME_ERROR_MESSAGE);
  const onBlurEmail = createBlurValidation(checkEmailAvailability, setError, "email", EMAIL_ERROR_MESSAGE);

  const onSubmit = handleSubmit(async (data: ProfileType) => {
    const cloudflareForm = new FormData();
    if (state.imageFile) {
      cloudflareForm.append("file", state.imageFile);
      const response = await fetch(state.uploadUrl, {
        method: "post",
        body: cloudflareForm,
      });
      if (response.status !== 200) return;
    }
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("newPassword", data.newPassword ?? "");
    formData.append("bio", data.bio ?? "");
    formData.append("photo", data.photo ?? "");
    const { isSuccess, message } = await editProfile(formData);
    console.log(message);
    if (!isSuccess) {
      setError("root", { message });
    }
  });

  const onValid = async () => {
    await onSubmit();
  };
  const onClickCancelAvatar = () => {
    setValue("photo", "");
    dispatch.handleImageCancel();
  };

  return (
    <form action={onValid} className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div
          style={{ backgroundImage: `url(${state.previewImage ? state.previewImage : getValues("photo")})` }}
          className={`size-20 rounded-full bg-center bg-cover  ${
            state.previewImage ? "" : "bg-none "
          } border-2 border-red-500`}>
          {!state.previewImage && <UserIcon className="size-20 text-underline" />}
        </div>
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
          onChange={(e) => dispatch.handleImageChange(e, setValue, IMAGES_OPTIONS.SMALL)}
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
        {...register("username", { onBlur: onBlurUsername })}
      />
      {!initialUserInformation.isSocialUser && (
        <>
          <Input
            label="이메일"
            type="email"
            required={!initialUserInformation.isSocialUser}
            placeholder="이메일을 입력해주세요."
            errorMessage={errors.email?.message}
            {...register("email", { onBlur: onBlurEmail })}
          />
          <Input
            label="현재 비밀번호"
            type="password"
            required={!initialUserInformation.isSocialUser}
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
        </>
      )}
      <Input
        label="자기소개"
        type="text"
        required={false}
        placeholder="자기소개를 입력해주세요."
        errorMessage={errors.bio?.message}
        {...register("bio")}
      />
      <p className="w-full text-center text-error">{errors.root?.message}</p>
      <Button text="수정 완료" />
    </form>
  );
}
