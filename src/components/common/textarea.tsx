"use client";

import { ForwardedRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const _Textarea = (
  {
    name,
    placeholder,
    errorMessage,
    label,
    ...rest
  }: {
    name: string;
    placeholder: string;
    errorMessage?: string;
    label?: ReactNode;
  } & InputHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex">
        <textarea
          ref={ref}
          id={name}
          className="w-full h-[130px] p-3 border rounded-[10px] border-underline placeholder:text-underline text-md "
          name={name}
          placeholder={placeholder}
          disabled={pending}
          {...rest}
        />
      </div>
      <div className="h-5 mt-1 pl-2 text-error">{errorMessage}</div>
    </div>
  );
};

export default forwardRef(_Textarea);
