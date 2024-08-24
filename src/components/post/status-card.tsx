export default function StatusCard() {
  return (
    <div className="flex justify-around">
      <div className=" *:font-semibold flex flex-col gap-1 items-center ">
        <span>누적 인증</span>
        <div className="chip w-[60px]">10</div>
      </div>
      <div className=" *:font-semibold flex flex-col gap-1 items-center ">
        <span>이번달 인증</span>
        <div className="chip w-[60px]">10</div>
      </div>
    </div>
  );
}
