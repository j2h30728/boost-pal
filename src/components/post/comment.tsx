import { ChatBubbleBottomCenterTextIcon, XMarkIcon } from "@heroicons/react/24/solid";

const comments = [
  {
    id: 1,
    text: "댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글",
    isAuthor: true,
    user: {
      username: "댓글이름",
    },
  },
  {
    id: 2,
    text: "댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글",
    isAuthor: false,
    user: {
      username: "댓글이름",
    },
  },
];

export default function Comment() {
  return (
    <div>
      <form className="flex w-full gap-2 comment-form ">
        <div className="flex relative w-full ">
          <label className="absolute -translate-y-1/2 top-1/2 left-3">
            <ChatBubbleBottomCenterTextIcon className="size-6 text-underline " />
          </label>
          <input
            className="bg-transparent h-11 pl-12 w-full text-underline  border-b border-underline focus:outline-none focus:ring focus:ring-secondary placeholder:text-underline"
            name="text"
            type="text"
            required
            placeholder="코멘트를 입력해주세요."
          />
        </div>
        <input type="hidden" name="tweetId" value="tweetId" />
        <button className="primary-button min-w-16">추가</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="*:text-md flex items-center my-3">
          <span className="font-semibold w-3/12 min-w-16">{comment.user.username}</span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span> {comment.text}</span>
              {comment.isAuthor ? (
                <form className="ml-auto bg-secondary rounded-full aspect-square h-full max-w-10 w-full flex justify-center items-center">
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button>
                    <XMarkIcon className="size-5 text-neutral" />
                  </button>
                </form>
              ) : (
                <div className="aspect-square h-full max-w-10 w-full"></div>
              )}
            </div>
            <span className=" self-end text-underline text-xs mr-3">10일 전</span>
          </div>
        </div>
      ))}
    </div>
  );
}
