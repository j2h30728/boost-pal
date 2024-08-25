"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { accountSchema, CreateAccountType } from "@/lib/schema";
import { handleCreateAccount } from "@/app/(auth)/create-account/actions";

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountType>({
    mode: "onChange",
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = handleSubmit(async (data: CreateAccountType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
    const errors = await handleCreateAccount(formData);
    setError("root", { message: errors?.toString() });
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
        {...register("username")}
      />
      <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        required={true}
        errorMessage={errors.email?.message}
        label="이메일"
        {...register("email")}
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
        type="confirm_password"
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
