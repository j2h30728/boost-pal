import PostList from "@/components/post/post-list";
import SearchForm from "@/components/post/search-form";

export default function SearchPage() {
  return (
    <div className="flex flex-col">
      <SearchForm />
      <PostList />
    </div>
  );
}
