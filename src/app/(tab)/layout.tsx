import Header from "@/components/common/header";
import TabBar from "@/components/common/tab-bar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative pb-[40px]">
      <Header />
      <div className="pt-[60px]">{children}</div>
      <TabBar />
    </div>
  );
}
