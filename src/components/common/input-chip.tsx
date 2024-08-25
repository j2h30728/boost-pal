"use client";

import { ForwardedRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const _Input = (
  {
    name,
    value,
    type,
    title,
    errorMessage,
    ...rest
  }: {
    name: string;
    value: string;
    type: HTMLInputTypeAttribute;
    title: string;
    errorMessage?: string;
  } & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { pending } = useFormStatus();

  return (
    <>
      <label
        htmlFor={value}
        className=" w-fit py-[2px] px-5 border border-underline text-underline text-base rounded-[100px] has-[:checked]:text-primary has-[:checked]:border-primary">
        <input
          className="appearance-none"
          ref={ref}
          type={type}
          id={value}
          name={name}
          value={value}
          disabled={pending}
          {...rest}
        />
        {title}
      </label>
    </>
  );
};

export default forwardRef(_Input);
