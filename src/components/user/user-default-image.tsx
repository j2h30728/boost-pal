import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function UserDefaultImage({
  avatar,
  username,
  style,
  width = 40,
  height = 40,
}: {
  avatar: string | null;
  username: string;
  width?: number;
  height?: number;
  style?: string;
}) {
  return (
    <div className={`rounded-full relative` + style}>
      {avatar !== null ? (
        <Image
          src={`${avatar}/small`}
          className={`rounded-full aspect-square w-full`}
          width={width}
          height={height}
          alt={username}
        />
      ) : (
        <UserIcon width={width} height={height} className="bg-underline" />
      )}
    </div>
  );
}
