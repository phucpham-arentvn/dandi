import Sidebar from "@/components/layout/Sidebar";
import { Session } from "next-auth";

export default function PlaygroundLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar session={session} />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
