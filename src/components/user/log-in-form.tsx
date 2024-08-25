"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { logInSchema, LogInType } from "@/lib/schema";
import { handleLogIn } from "@/app/(auth)/log-in/actions";

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInType>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = handleSubmit(async (data: LogInType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const errors = await handleLogIn(formData);
    setError("root", { message: errors?.toString() });
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <form action={onValid} className="flex flex-col gap-3 ">
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
      <Button text="로그인" />
      <p className="text-error">{errors.root?.message}</p>
    </form>
  );
}
