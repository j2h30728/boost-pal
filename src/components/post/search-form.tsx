import Input from "@/components/common/input";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function SearchForm({ onSearch }: { onSearch: (formData: FormData) => void }) {
  return (
    <form action={onSearch} className="flex flex-col relative">
      <Input name="keyword" type="text" placeholder="검색어를 입력해주세요." required className="pr-16" />
      <div className="flex absolute -translate-y-1/2 top-1/3 right-0 gap-2">
        <button type="button">
          <XCircleIcon className="size-5 text-base" />
        </button>
        <button>
          <MagnifyingGlassIcon className="size-5 text-neutral" />
        </button>
      </div>
    </form>
  );
}
