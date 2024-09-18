import { ListOfPost } from "@/lib/types";
import PostList from "./post-list";

export default function SearchedPostList({
  searchPosts,
  message,
}: {
  searchPosts?: ListOfPost[] | null;
  message?: string;
}) {
  if (!searchPosts) {
    return <PostList initialPosts={[]} />;
  }
  if (searchPosts.length === 0) {
    return <p>{message ?? "검색 결과가 존재하지 않습니다"}.</p>;
  }
  return <PostList initialPosts={searchPosts} />;
}
