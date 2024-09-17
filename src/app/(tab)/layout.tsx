import HeaderLayout from "@/components/common/header-layout";
import TabBar from "@/components/common/tab-bar";
import { getUserInfoBySession } from "@/service/userService";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, error: authError } = await getUserInfoBySession();

  if (authError) {
    redirect("/intro");
  }

  return (
    <div className="relative pb-[100px]">
      <HeaderLayout>{children}</HeaderLayout>
      <TabBar username={encodeURI(user.username)} />
    </div>
  );
}
