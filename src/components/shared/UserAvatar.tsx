"use client";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface UserAvatarProps {
  session: Session | null;
}
export default function UserAvatar({ session }: UserAvatarProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-bold">Welcome!, {session?.user?.name}</p>
        <p className="text-gray-500 font-semibold">{session?.user?.email}</p>
        <div
          className="w-full flex items-center cursor-pointer hover:bg-gray-100"
          onClick={() => signOut()}
        >
          <LogOut className="h-6 w-6 text-red-500" />
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
}
