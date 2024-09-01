export default function InputSkeletonUI() {
  return (
    <div className="flex flex-col gap-1">
      <div id="label" className="skeleton w-28 h-4"></div>
      <div className="skeleton w-full h-12 px-2 py-3"></div>
      <div id="error-message" className="h-5 mt-1 pl-2 "></div>
    </div>
  );
}
