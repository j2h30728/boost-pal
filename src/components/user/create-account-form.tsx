"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { accountSchema, CreateAccountType } from "@/lib/schema";
import { handleCreateAccount } from "@/app/(auth)/create-account/actions";
import { isUsernameExists, isEmailExists } from "@/lib/server/validate";
import { createBlurValidation } from "@/lib/client/form-validate";

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountType>({
    resolver: zodResolver(accountSchema),
  });

  const onBlurUsername = createBlurValidation(isUsernameExists, setError, "username", "이미 존재하는 이름입니다.");
  const onBlurEmail = createBlurValidation(isEmailExists, setError, "email", "이미 존재하는 이메일입니다.");

  const onSubmit = handleSubmit(async (data: CreateAccountType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
    const { message } = await handleCreateAccount(formData);
    setError("root", { message });
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <form action={onValid} className="flex flex-col gap-3">
      <Input
        type="username"
        placeholder="최소 2자, 최대 8자 입력해주세요."
        required={true}
        errorMessage={errors.username?.message}
        label="이름"
        {...register("username", { onBlur: onBlurUsername })}
      />
      <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        required={true}
        errorMessage={errors.email?.message}
        label="이메일"
        {...register("email", { onBlur: onBlurEmail })}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        required={true}
        errorMessage={errors.password?.message}
        label="비밀번호"
        {...register("password")}
      />
      <Input
        type="password"
        placeholder="한 번 더 입력해주세요."
        required={true}
        errorMessage={errors.confirm_password?.message}
        label="비밀번호 확인"
        {...register("confirm_password")}
      />
      <Button text="회원가입" />
      <p className="text-error ">{errors.root?.message}</p>
    </form>
  );
}
