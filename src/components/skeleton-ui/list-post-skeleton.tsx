export default function ListPostSkeletonUI() {
  return (
    <div className="flex flex-col items-center px-5 py-4 shadow-custom rounded-2xl *:w-full gap-3 bg-white w-full">
      <div className="flex justify-between *:skeleton">
        <div className="w-10 h-5"></div>
        <div className="w-10 h-4"></div>
      </div>
      <div className="flex flex-col gap-3 items-center *:w-full">
        <div className="flex gap-3 justify-between items-center ">
          <div className="flex flex-col gap-1 *:skeleton w-full">
            <div className="w-full h-4"></div>
            <div className="w-3/4 h-4"></div>
          </div>
          <div className="min-w-[60px] w-[60px] h-[60px] skeleton rounded-full" />
        </div>
        <div className="flex gap-3 justify-between items-center">
          <div className="min-w-[60px] w-[60px] h-[60px] skeleton rounded-full" />
          <div className="flex flex-col gap-1 *:skeleton w-full">
            <div className="w-full h-4"></div>
            <div className="w-3/4 h-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
