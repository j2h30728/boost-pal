import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

export const createBlurValidation = <TFieldValues extends FieldValues = FieldValues>(
  validationFn: (value: string) => Promise<boolean>,
  setErrorFn: UseFormSetError<TFieldValues>,
  fieldName: FieldPath<TFieldValues>,
  errorMessage: string
) => {
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isExists = await validationFn(value);
    if (isExists) {
      setErrorFn(fieldName, { message: errorMessage });
    } else {
      setErrorFn(fieldName, { message: "" });
    }
  };
};
