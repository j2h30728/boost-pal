"use client";

import { useState } from "react";
import Button from "../common/button";
import Input from "../common/input";

export default function ProfileEditForm() {
  const [previewImage, setPreviewImage] = useState("");
  const onImageChange = () => {};

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div className="size-20 bg-underline rounded-full"></div>
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${previewImage})` }}
          className="primary-button w-20 text-xs rounded-3xl -mt-3">
          {previewImage === "" ? <span>이미지 수정</span> : <span>취소</span>}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
      </div>
      <Input label="이메일" type="email" required placeholder="이메일을 입력해주세요." name="email" errorMessage={""} />
      <Input
        label="현재 비밀번호"
        type="password"
        required
        placeholder="현재 비밀번호를 입력해주세요."
        name="password"
        errorMessage={"errors.password?.message"}
      />
      <Input
        label="새 비밀번호"
        type="password"
        required={false}
        placeholder="변경할 새로운 비밀번호를 입력해주세요."
        name="newPassword"
        errorMessage={"errors.newPassword?.message"}
      />
      <Input
        label="닉네임"
        type="text"
        required
        placeholder="닉네임을 입력해주세요."
        name="username"
        errorMessage={"errors.username?.message"}
      />
      <Input
        label="자기소개"
        type="text"
        required={false}
        placeholder="자기소개를 입력해주세요."
        name="bio"
        errorMessage={"errors.email?.message"}
      />
      <Button text="수정 완료" />
    </form>
  );
}
