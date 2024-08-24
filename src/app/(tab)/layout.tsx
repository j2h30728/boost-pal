import HeaderLayout from "@/components/common/header-layout";
import TabBar from "@/components/common/tab-bar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative pb-[40px]">
      <HeaderLayout>{children}</HeaderLayout>
      <TabBar />
    </div>
  );
}
