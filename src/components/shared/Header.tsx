import React from "react";
import { Button } from "../ui/button";
import { auth } from "@/auth";

import Link from "next/link";

import UserAvatar from "./UserAvatar";

export default async function Header() {
  const session = await auth();
  console.log(session);
  return (
    <header className="flex justify-between items-center h-14 bg-zinc-100">
      <div>
        <h1 className="text-2xl font-bold">FormCraft</h1>
      </div>
      <div>
        {session && <UserAvatar session={session} />}
        {!session?.user && (
          <Link href="/api/auth/signin">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
