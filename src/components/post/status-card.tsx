import { getPostCountByLoggedInUser, getPostCountForThisMonth } from "@/service/postService";

export default async function StatusCard() {
  const postAllCount = await getPostCountByLoggedInUser();
  const postCountForThisMonth = await getPostCountForThisMonth();
  return (
    <div className="flex justify-around w-full *:py-5 *:gap-2 ">
      <div className=" *:font-semibold flex flex-col items-center ">
        <span>누적 인증</span>
        <div className="chip w-[60px]">{postAllCount}</div>
      </div>
      <div className=" *:font-semibold flex flex-col items-center ">
        <span>이번달 인증</span>
        <div className="chip w-[60px]">{postCountForThisMonth}</div>
      </div>
    </div>
  );
}
