import HeaderLayout from "@/components/common/header-layout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <HeaderLayout>{children}</HeaderLayout>
    </div>
  );
}
