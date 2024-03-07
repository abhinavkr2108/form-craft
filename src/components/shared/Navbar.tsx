"use client";
import { Session } from "next-auth";
import { useState, useRef, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavbarProps {
  session: Session | null;
}
export default function Navbar({ session }: NavbarProps) {
  const [menuState, setMenuState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Home", path: "/" },
    { title: "View Created Forms", path: "/view-form" },
    { title: "Pricing", path: "/pricing" },
  ];
  return (
    <nav className="bg-white border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <h1 className="text-2xl font-bold">FormCraft</h1>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ul>
              {session && (
                <div className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                  {navigation.map((item, idx: number) => (
                    <li key={idx} className="text-gray-600 hover:text-gray-900">
                      <Link href={item.path}>{item.title}</Link>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            {session && <UserAvatar session={session} />}
            {!session?.user && (
              <Link href="/api/auth/signin">
                <Button>Login</Button>
              </Link>
            )}

            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
