import ListPost from "./list-post";

export default function PostList() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2].map((_, i) => (
        <ListPost key={i} />
      ))}
    </div>
  );
}
