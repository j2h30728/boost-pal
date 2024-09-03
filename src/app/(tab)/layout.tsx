import HeaderLayout from "@/components/common/header-layout";
import TabBar from "@/components/common/tab-bar";
import { getUserInfoBySession } from "@/service/userService";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfoBySession();

  return (
    <div className="relative pb-[100px]">
      <HeaderLayout>{children}</HeaderLayout>
      <TabBar username={encodeURI(user.username)} />
    </div>
  );
}
