import Sidebar from "@/components/layout/Sidebar";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
