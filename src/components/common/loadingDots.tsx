export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center space-x-2 *:size-5 *:bg-primary-2 *:rounded-full">
      <div className="animate-bounce"></div>
      <div className="animate-bounce [animation-delay:0.2s]"></div>
      <div className="animate-bounce [animation-delay:0.4s]"></div>
    </div>
  );
}
