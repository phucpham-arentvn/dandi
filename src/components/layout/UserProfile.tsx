"use client";

import Image from "next/image";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserProfileProps {
  session: Session;
}

export default function UserProfile({ session }: UserProfileProps) {
  return (
    <div className="px-3 mb-6">
      <button
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
        className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <div className="bg-blue-600 rounded-full flex items-center justify-center">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <Image
                src={`${session.user?.image}`}
                alt="User Avatar"
                width={120}
                height={40}
              />
            </div>
          </div>
        </div>
        <span className="flex-grow text-left">{session.user?.name}</span>
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        <li onClick={() => signOut()}>
          <a>
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
