"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "@/components/common/button";
import Textarea from "@/components/common/textarea";
import InputChip from "@/components/common/input-chip";
import Header from "@/components/common/header";

const CATEGORIES = ["운동", "공부", "식단", "기상", "독서", "기타"] as const;

export default function AddTweets() {
  const [previewImage, setPreviewImage] = useState("");
  const onImageChange = () => {};

  return (
    <div>
      <Header isBackButton={true} />
      <form className="p-5 pt-[60px] *:w-full">
        <div className="flex flex-col gap-5 ">
          <label
            htmlFor="photo"
            style={{ backgroundImage: `url(${previewImage})` }}
            className=" border-2 border-primary w-full h-[200px] mx-auto flex items-center justify-center flex-col text-primary rounded-[16px] border-dashed cursor-pointer bg-center bg-cover ">
            {previewImage === "" ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-sub-border rounded-full">
                  <PlusIcon className="w-6 h-6 text-base" />
                </div>
                <div className="text-neutral-400 text-sm">{undefined ?? "사진을 추가해주세요."}</div>
              </div>
            ) : null}
          </label>
          <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">주제</p>
            <p className="text-neutral text-sm">작성하신 인증 주제를 1가지 선택해주세요.</p>
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map((category) => (
                <InputChip key={category} name="category" value={category} type="radio" />
              ))}
            </div>
          </div>
          <Textarea label="인증 내용" name="upload" placeholder="인증에 대한 내용을 입력해주세요." />
        </div>
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
