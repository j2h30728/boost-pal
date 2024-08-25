import Link from "next/link";

import PostList from "@/components/post/post-list";
import StatusCard from "@/components/post/status-card";
import UserImage from "@/components/user/user-image";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="p-5 flex items-center gap-3 ">
          <UserImage />
          {{
            /* {params.username === loggedInUser.username */
          } && (
            <Link className="ml-auto primary-button w-fit px-3 py-2" href={`edit`}>
              내 정보 수정
            </Link>
          )}
        </div>
        <p className="px-8">
          자기소개
          자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개
        </p>
      </div>
      <StatusCard />
      <div className="p-5 flex flex-col gap-5">{/* <PostList /> */}</div>
    </main>
  );
}
