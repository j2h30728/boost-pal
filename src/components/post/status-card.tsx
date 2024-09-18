import { throwErrors } from "@/lib/error/throwErrors";
import { getPostCountByLoggedInUser, getPostsCountForThisMonth } from "@/service/postService";

export default async function StatusCard() {
  const { data: postAllCount, error: postsCountError } = await getPostCountByLoggedInUser();
  const { data: PostsCountForThisMonth, error: PostsCountForThisMonthError } = await getPostsCountForThisMonth();
  if (postsCountError || PostsCountForThisMonthError) {
    throwErrors(postsCountError, PostsCountForThisMonthError);
  }
  return (
    <div className="flex justify-around w-full *:py-5 *:gap-2 ">
      <div className=" *:font-semibold flex flex-col items-center ">
        <span>누적 인증</span>
        <div className="chip w-[60px]">{postAllCount}</div>
      </div>
      <div className=" *:font-semibold flex flex-col items-center ">
        <span>이번달 인증</span>
        <div className="chip w-[60px]">{PostsCountForThisMonth}</div>
      </div>
    </div>
  );
}
