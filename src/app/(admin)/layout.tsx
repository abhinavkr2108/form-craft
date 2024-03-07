import { auth } from "@/auth";
import Navbar from "@/components/shared/Sidenav";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div>
      <Navbar session={session} />
      <div className="pt-8">{children}</div>
    </div>
  );
}
