import Link from "next/link";

import { ROUTE_PATHS } from "@/constants/routePath";
import CreateAccount from "@/components/user/create-account-form";

export default function CreateAccountPage() {
  return (
    <main className="flex flex-col gap-5">
      <CreateAccount />
      <p className="text-base">
        이미 계정이 있나요?
        <Link className="text-secondary-1 ml-3" href={ROUTE_PATHS.LOG_IN}>
          로그인
        </Link>
      </p>
    </main>
  );
}
