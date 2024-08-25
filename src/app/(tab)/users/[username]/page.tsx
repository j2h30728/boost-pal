import Link from "next/link";

import PostList from "@/components/post/post-list";
import StatusCard from "@/components/post/status-card";
import { getUserInfoBySession } from "@/service/userService";
import { getPostsByLoggedInUser } from "@/service/postService";
import UserDefaultImage from "@/components/user/user-default-image";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const loggedInUser = await getUserInfoBySession();
  const posts = await getPostsByLoggedInUser();
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="p-5 flex items-center gap-3 ">
          <div className="flex gap-5 items-center">
            <UserDefaultImage style="size-48" username={loggedInUser.username} avatar={loggedInUser.avatar} />
            <span className="text-sm">{loggedInUser.username}</span>
          </div>
          {params.username === loggedInUser.username && (
            <Link className="ml-auto primary-button w-fit px-3 py-2" href={`/users/${loggedInUser.username}/edit`}>
              내 정보 수정
            </Link>
          )}
        </div>
        <p className="px-8">{loggedInUser.bio}</p>
      </div>
      <StatusCard />
      <div className="p-5 flex flex-col gap-5">
        <PostList initialPosts={posts} />
      </div>
    </main>
  );
}
