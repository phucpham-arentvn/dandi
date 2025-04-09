import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Image src="/next.svg" alt="Tavily Logo" width={120} height={40} />
      </div>

      {/* Personal Section */}
      <div className="px-3 mb-6">
        <button className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">i</span>
          </div>
          <span className="flex-grow text-left">Personal</span>
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

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
