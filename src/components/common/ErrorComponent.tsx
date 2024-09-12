import Logo from "./Logo";

const ErrorComponent = ({ message, onReset }: { message: string; onReset?: () => void }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-around items-center gap-5">
      <div className="flex flex-col gao-7">
        <Logo />
        <p className="text-md">문제가 발생했습니다. 문제가 발생하여 페이지를 읽어들이지 못했습니다.</p>
      </div>
      <small className="text-xl text-center">{message}</small>
      {onReset && (
        <button className="primary-button w-full" onClick={onReset}>
          재시도
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
