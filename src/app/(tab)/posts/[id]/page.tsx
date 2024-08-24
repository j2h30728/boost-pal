import AIComment from "@/components/post/ai-comment";
import Comment from "@/components/post/comment";
import UserImage from "@/components/user/user-image";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid";

export default function DetailPost({ params }: { params: { id: string } }) {
  return (
    <div className="w-full">
      <div className="p-5 flex items-center gap-3  justify-between">
        <UserImage />
        <span className="chip w-10 h-4 text-xs">운동</span>
      </div>
      <div className="relative w-4/5 aspect-square max-h-96 mx-auto bg-underline "></div>
      <div className="p-5 flex flex-col gap-6">
        <p>
          왜 갈수록 체력이 줄어드는거 같은기분ㅋㅋ 5분뛰고 힘들어서 천천히 뛰었더니 8주동안 제일 느리게 뛰었네요. 그래도
          20분 포기 안했다. 한 잔 해~
        </p>
        <div className="flex gap-5 items-start justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <HeartIcon className="size-6" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <EyeIcon className="size-6 text-underline" />
              <span>0</span>
            </div>
          </div>
          <span className="text-underline">3월 20일(수) 13:00</span>
        </div>
        <AIComment />
        <Comment />
      </div>
    </div>
  );
}
