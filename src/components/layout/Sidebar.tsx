import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import UserProfile from "./UserProfile";

interface SidebarProps {
  session: Session;
}

export default function Sidebar(props: SidebarProps) {
  const { session } = props;
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Image src="/next.svg" alt="Tavily Logo" width={120} height={40} />
      </div>

      {/* Personal Section */}
      <UserProfile session={session} />

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Overview</span>
        </Link>

        <div className="relative">
          <Link
            href="/account"
            className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
          >
            <UserIcon className="w-5 h-5" />
            <span>My Account</span>
          </Link>
        </div>

        <Link
          href="/playground"
          className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
        >
          <CodeBracketIcon className="w-5 h-5" />
          <span>API Playground</span>
        </Link>

        <Link
          href="/documentation"
          className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
        >
          <DocumentTextIcon className="w-5 h-5" />
          <span>Documentation</span>
          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-auto" />
        </Link>
      </nav>
    </div>
  );
}
