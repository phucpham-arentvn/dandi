"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
