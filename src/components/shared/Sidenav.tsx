"use client";
import { useState } from "react";
import { Avatar } from "../ui/avatar";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}
export default function Navbar({ session }: NavbarProps) {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "My Forms", path: "/view-form" },
    { title: "Results", path: "/results" },
    { title: "Analytics", path: "/analytics" },
    { title: "Charts", path: "/charts" },
    { title: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-gray-300 w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <h1 className="text-2xl font-bold">Form-Craft</h1>
          <div className="flex md:hidden items-center">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
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
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
            <div className="inline-block ml-4">
              <a
                href="javascript:void(0)"
                className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          <UserAvatar session={session} />
        </div>
      </div>
    </nav>
  );
}
