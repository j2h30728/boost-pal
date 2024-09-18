"use client";

import SearchForm from "@/components/post/search-form";
import { useFormState } from "react-dom";
import { searchPosts } from "./action";
import SearchedPostList from "@/components/post/search-post-list";

export default function SearchPage() {
  const [state, action] = useFormState(searchPosts, null);

  return (
    <div className="flex flex-col">
      <SearchForm onSearch={action} />
      <SearchedPostList searchPosts={state?.data} message={state?.message} />
    </div>
  );
}
