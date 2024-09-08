import { CATEGORIES } from "@/constants/categories";

export default function UploadLoading() {
  return (
    <div className="pt-[60px] px-5">
      <div className="flex flex-col gap-5 *:skeleton ">
        <div className="w-full aspect-[5/3] mx-auto rounded-[16px]"></div>
        <div className="flex flex-col gap-2 *:skeleton">
          <div className="w-12 h-5"></div>
          <div className="w-3/4 h-4"></div>
          <div className="flex flex-wrap gap-1 *:skeleton">
            {Object.entries(CATEGORIES).map((_, i) => (
              <div key={i} className=" w-fit py-[2px] px-5 rounded-[100px] " />
            ))}
          </div>
          <div className="w-12 h-5"></div>
          <div className="w-full h-[125px] p-3 rounded-[10px]"></div>
        </div>
        <div />
      </div>
      <div className="rounded-[13px] py-3 w-full h-11"></div>
    </div>
  );
}
