import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DeleteButton({
  onDelete,
  isAuthor,
  id,
}: {
  onDelete: (formData: FormData) => void;
  isAuthor: boolean;
  id: number;
}) {
  return (
    <>
      {isAuthor ? (
        <form
          action={onDelete}
          className="ml-auto bg-secondary rounded-full aspect-square h-full max-w-10 w-full flex justify-center items-center">
          <input type="hidden" name="id" value={id} />
          <button>
            <XMarkIcon className="size-5 text-neutral" />
          </button>
        </form>
      ) : (
        <div className="aspect-square h-full max-w-10 w-full"></div>
      )}
    </>
  );
}
