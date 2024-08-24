import Link from "next/link";

export default function ListPost() {
  return (
    <Link
      href={"/posts/1"}
      className="text-neutral flex flex-col items-center px-5 py-4 shadow-custom rounded-2xl *:w-full gap-3">
      <div className="flex justify-between">
        <span>3월 20일 (수) 13:00</span>
        <div className="chip w-10 h-4 text-xs">운동</div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <div className="flex gap-3 justify-between items-center">
          <p className="multiline-ellipsis text-sm">
            왜 갈수록 체력이 줄어드는거 같은기분ㅋㅋ 5분뛰고 힘들어서 천천히 뛰었더니 8주동안 제일 느리게 뛰었네요.
            그래도 20분 포기 안했다. 한 잔 해~
          </p>
          <div className="min-w-11 h-11 bg-underline rounded-full"></div>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <div className="min-w-11 h-11 bg-underline rounded-full"></div>
          <p className="multiline-ellipsis  text-sm text-[#9C8663]">
            와, 정말 대단하세요! 비록 힘들었더라도 20분 동안 포기하지 않고 뛰신 거, 정말 멋져요! 🌟와, 정말 대단하세요!
            비록 힘들었더라도 20분 동안 포기하지 않고 뛰신 거, 정말 멋져요! 🌟.
          </p>
        </div>
      </div>
    </Link>
  );
}
