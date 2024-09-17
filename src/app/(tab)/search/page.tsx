"use client";

import SearchForm from "@/components/post/search-form";
import { useFormState } from "react-dom";
import { searchPosts } from "./action";
import PostList from "@/components/post/post-list";

export default function SearchPage() {
  const [state, action] = useFormState(searchPosts, null);

  return (
    <div className="flex flex-col">
      <SearchForm onSearch={action} />
      {state?.isSuccess ? <PostList initialPosts={state.data ?? []} /> : <p>{state?.message}</p>}
    </div>
  );
}
