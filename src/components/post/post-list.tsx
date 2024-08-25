import { InitialPosts } from "@/service/postService";
import ListPost from "./list-post";

export default function PostList({ initialPosts }: { initialPosts: InitialPosts["items"] }) {
  return (
    <div className="flex flex-col gap-4">
      {initialPosts.map((post, i) => (
        <ListPost key={post.id} {...post} />
      ))}
    </div>
  );
}
