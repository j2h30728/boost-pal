import Header from "@/components/common/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      <div className="pt-[60px] px-5">{children}</div>
    </div>
  );
}
