import { getPostCountByLoggedInUser, getPostCountForThisMonth } from "@/service/postService";

export default async function StatusCard() {
  const postAllCount = await getPostCountByLoggedInUser();
  const postCountForThisMonth = await getPostCountForThisMonth();
  return (
    <div className="flex justify-around">
      <div className=" *:font-semibold flex flex-col gap-1 items-center ">
        <span>누적 인증</span>
        <div className="chip w-[60px]">{postAllCount}</div>
      </div>
      <div className=" *:font-semibold flex flex-col gap-1 items-center ">
        <span>이번달 인증</span>
        <div className="chip w-[60px]">{postCountForThisMonth}</div>
      </div>
    </div>
  );
}
