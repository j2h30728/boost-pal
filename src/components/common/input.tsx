"use client";

import { ForwardedRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const _Input = (
  {
    name,
    type,
    placeholder,
    required,
    errorMessage,
    label,
    ...rest
  }: {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    required: boolean;
    errorMessage?: string;
    label?: ReactNode;
  } & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-bold">
        {label}
      </label>
      <div className="flex">
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          disabled={pending}
          {...rest}
          className={`w-full h-12 border-b border-underline px-2 py-3 placeholder:text-underline text-md ${rest.className}`}
        />
      </div>
      <div className="h-5 mt-1 pl-2 text-error">{errorMessage}</div>
    </div>
  );
};

export default forwardRef(_Input);
